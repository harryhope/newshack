import {isObject} from 'lodash'
import React, {Component} from 'react'
import u from 'updeep'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {store, publish} from 'store'
import {hydrate} from 'utils/api-client'
import Loader from 'components/loader'
import {timeSince} from 'utils/time'
import {colors} from 'styles/variables'
import {
  Headline,
  Capsule,
  Sitename,
  Button,
  Centered
} from 'styles/mixins'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`
const Outer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.border};
  padding: 16px 0 8px;
`
const Inner = styled.div`
  padding: 0 16px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
`

const Comment = styled.div`
  font-size: 15px;
  border-bottom: 1px solid ${colors.border};
  padding: 16px 24px;
  width: 100%;
  word-wrap: break-word;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
  &:last-of-type {
    border-bottom: none;
  }
  a {
    color: ${colors.lightText};
    text-decoration: underline;
  }
`

const Byline = styled.aside`
  padding-bottom: 16px;
  span {
    color: ${colors.lightText}
  }
`

const Text = styled.div`
  margin: 8px 0;
`

const recursivelyHydrate = current => {
  const item = Object.assign({}, current)
  return hydrate(item.kids).then(kids => {
    const promises = kids.map(kid => {
      if (kid.kids) {
        return recursivelyHydrate(kid)
      } else {
        return null
      }
    }).filter(item => !!item)

    return Promise.all(promises).then(filledKids => {
      item.kids = filledKids
      item.expanded = true
      return item
    })
  })
}

const expand = props => {
  recursivelyHydrate(props).then(item => {
    const state = store.getState()
    const kids = state.item.kids.map(current => {
      const kid = Object.assign({}, current)
      if (kid.id === item.id) {
        kid.kids = item.kids
        kid.expanded = true
      }
      return kid
    })
    publish('Expand Comments', {
      item: {
        kids: u.constant(kids)
      }
    })
  })
}

const Kid = props =>
  <Comment>
    <Byline><strong>{props.by}</strong> <span>{timeSince(new Date(props.time * 1000))} ago.</span></Byline>
    <Text dangerouslySetInnerHTML={{__html: props.text}} />
    {props.kids && !props.expanded && props.kids.length > 0 &&
      <Centered><Button onClick={() => expand(props)}>{props.kids.length} {props.kids.length === 1 ? 'Reply' : 'Replies'}</Button></Centered>
    }
    {props.expanded && props.kids.map(kid => <Kid key={kid.id} {...kid} />)}
  </Comment>

const ItemView = props =>
  <Wrapper>
    <Outer>
      <Inner>
        <div>
          <Capsule>{props.item.score}</Capsule>
        </div>
        <div>
          <Headline href={props.item.url}>{props.item.title}</Headline>
          <Sitename>{props.item.url && new URL(props.item.url).hostname}</Sitename>
        </div>
      </Inner>
    </Outer>
    {props.item.kids && props.item.kids
      .filter(isObject)
      .map(kid =>
        <Kid key={kid.id} {...kid} />
      )
    }
  </Wrapper>

class Item extends Component {
  componentDidMount () {
    publish('Load Item', {isLoadingItem: true})
    const {id} = this.props.match.params
    hydrate([id]).then(([item]) =>
      Promise.all([item, hydrate(item.kids)])
    ).then(([item, kids]) => {
      item.kids = kids
      publish('Finish Loading Item', {
        item,
        isLoadingItem: false
      })
    })
  }

  render () {
    return (
      <Wrapper>
        {this.props.isLoadingItem
          ? <Loader />
          : <ItemView {...this.props} />
        }
      </Wrapper>
    )
  }
}

export default connect(state => ({
  isLoadingItem: state.isLoadingItem || false,
  item: state.item || {}
}))(Item)
