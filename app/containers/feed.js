import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Title from 'components/title'
import Spinner from 'components/spinner'
import {publish} from 'store'
import {colors} from 'styles/variables'
import {getFeed, paginate, hydrate} from 'utils/api-client'

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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`

const ListItem = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.border};
  display: flex;
`

const Headline = styled.a`
  color: ${colors.dark};
  font-size: 18px;
  font-weight: 500;
  padding: 4px 0;
  margin: 4px 0;
  display: inline-block;
  @media (min-width: 960px) {
    font-size: 24px;
  }
  &:hover {
    color: ${colors.lightText};
  }
`

const Capsule = styled.strong`
  font-weight: 500;
  color: ${colors.light};
  background: ${colors.primary};
  padding: 2px 6px;
  border-radius: 10px;
  position: relative;
  top: 10px;
  font-size: 10px;
  margin-right: 8px;
  min-width: 34px;
  display: block;
  text-align: center;
  @media (min-width: 960px) {
    top: 14px;
  }
`

const Details = styled.div`
  font-size: 12px;
  margin: 4px 0;
  padding-bottom: 4px;
  display: block;
  color: ${colors.lightText};

`

const List = props =>
  <Wrapper>
    {props.items.map(item =>
      <ListItem>
        <div>
          <Capsule>{item.score}</Capsule>
        </div>
        <div>
          <Headline key={item.id} href={item.url}>{item.title}</Headline>
          <Details>{item.score} point{item.score > 1 && 's'} by {item.by}</Details>
        </div>
      </ListItem>
    )}
  </Wrapper>

const Loader = () =>
  <Overlay>
    <Spinner />
  </Overlay>

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
    if (page !== this.props.page || number !== this.props.number) {
      return publish('Change Data Source', {
        page,
        number,
        isLoading: true,
        op: page !== this.props.page ? ops.FETCHING : ops.HYDRATING
      })
    }

    if (this.props.op === ops.FETCHING) {
      return Promise.resolve().then(() => {
        publish('Begin Fetch', {op: ops.IDLE})
        console.log('fetching')
        return getFeed(page)
      }).then(resp => {
        publish('Set Feed', {feed: resp.body, op: ops.HYDRATING})
      }).catch(handleError)
    } else if (this.props.op === ops.HYDRATING) {
      publish('Begin Hydrate', {op: ops.IDLE})
      const segment = paginate(this.props.feed, number)
      console.log(segment, 'hydrating')
      return hydrate(segment)
        .then(resp => publish('populate', {items: resp, isLoading: false}))
        .catch(handleError)
    }
  }

  render () {
    return (
      <Wrapper>
        <Title>Newshack</Title>
        {this.props.isLoading
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
  isLoading: state.isLoading || false,
  op: state.op || ops.IDLE,
  feed: state.feed || null,
  items: state.items || []
}))(Feed)
