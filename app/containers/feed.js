import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Title from 'components/title'
import Loader from 'components/loader'
import {publish} from 'store'
import {colors} from 'styles/variables'
import {timeSince} from 'utils/time'
import {getFeed, paginate, hydrate} from 'utils/api-client'
import {
  Headline,
  Capsule,
  Sitename,
  ListItem,
  Button,
  Centered
} from 'styles/mixins'

const ops = {
  IDLE: 'IDLE',
  FETCHING: 'FETCHING',
  HYDRATING: 'HYDRATING',
  ERRORING: 'ERRORING'
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 8px;
`

const Details = styled.div`
  font-size: 12px;
  margin: 4px 0;
  padding-bottom: 4px;
  display: block;
  color: ${colors.lightText};
  span {
      font-size: 11px;
      color: ${colors.lighterText};
      border-left: 1px solid ${colors.border};
      border-right: 1px solid ${colors.border};
      padding: 0 4px;
      margin: 0 4px;
  }
`

const CommentsLink = styled(Link)`
  padding: 4px;
  font-weight: bold;
  color: ${colors.lightText};
  font-size: 12px;
  &:hover {
    color: ${colors.lighterText};
  }
`

const Label = styled.span`
  font-size: 14px;
  color: ${colors.lightText};
  text-transform: uppercase;
  font-weight: bold;
`

const List = props =>
  <Wrapper>
    <ListItem><Label>Page {Number(props.number) + 1}</Label></ListItem>
    {props.items.filter(item => _.isObject(item)).map(item =>
      <ListItem key={item.id}>
        <div>
          <Capsule>{item.score}</Capsule>
        </div>
        <div>
          {item.url
            ? <Headline href={item.url} target='_blank'>{item.title}</Headline>
            : <Headline as={Link} to={`/item/${item.id}`}>{item.title}</Headline>
          }
          <Sitename>{item.url && new URL(item.url).hostname}</Sitename>
          <Details>{timeSince(new Date(item.time * 1000))} ago<span>{item.by}</span>{item.descendants !== undefined && <CommentsLink to={`/item/${item.id}`}>{item.descendants} {item.descendants === 1 ? 'Comment' : 'Comments'}</CommentsLink>}</Details>
        </div>
      </ListItem>
    )}
    <Centered><Button wide='true' as={Link} to={`/${props.page}/${Number(props.number) + 1}`}>More</Button></Centered>
  </Wrapper>

class Feed extends Component {
  componentDidMount () {
    this.updateSource()
  }

  componentDidUpdate () {
    this.updateSource()
  }

  updateSource () {
    const {page, number = 0} = this.props.match.params
    const handleError = () => publish('Err', {op: ops.ERRORING})

    console.log('POPULATING')
    if (page !== this.props.page || number !== this.props.number) {
      const cache = window.sessionStorage.getItem(`cache:${page}:${number}`)
      if (cache && this.props.op === ops.IDLE && _.isEmpty(this.props.items)) {
        console.log('loading from cache')
        publish('populate', {items: JSON.parse(cache), isLoadingFeed: false})
      }

      return publish('Change Data Source', {
        page,
        number,
        isLoadingFeed: !cache,
        op: page !== this.props.page ? ops.FETCHING : ops.HYDRATING
      })
    }

    if (this.props.op === ops.FETCHING) {
      console.log('FETCHING')
      publish('Begin Fetch', {op: ops.IDLE})
      return getFeed(page).then(resp => {
        publish('Set Feed', {feed: resp.body, op: ops.HYDRATING})
      }).catch(handleError)
    } else if (this.props.op === ops.HYDRATING) {
      console.log('HYDRATING')
      publish('Begin Hydrate', {op: ops.IDLE})
      const segment = paginate(this.props.feed, number)
      return hydrate(segment)
        .then(resp => {
          publish('populate', {items: resp, isLoadingFeed: false})
          return resp
        })
        .then(resp => window.sessionStorage.setItem(
          `cache:${page}:${number}`,
          JSON.stringify(resp)
        ))
        .catch(handleError)
    }
  }

  render () {
    return (
      <Wrapper>
        <Title>Newshack</Title>
        {this.props.isLoadingFeed
          ? <Loader />
          : <List {...this.props} />
        }
      </Wrapper>
    )
  }
}

export default connect(state => ({
  page: state.page || null,
  number: state.number || 0,
  isLoadingFeed: state.isLoadingFeed || false,
  op: state.op || ops.IDLE,
  feed: state.feed || null,
  items: state.items || []
}))(Feed)
