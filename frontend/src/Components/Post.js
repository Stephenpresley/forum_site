import React from 'react';
import styled from 'styled-components';
import {withPosts} from '../providers/PostDataProvider';

const PostWrapper = styled.div`
  width: 100%;
  border: 1px solid #000000;
  padding: 10px;
  margin: 0 0 0 0;
`;
const PostTitle = styled.div`
  font-size: 20pt;
`;
const UNameAndTime = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 10pt;
`;
const PostBody = styled.div`
  padding: 10px;
`;
const CommentButton = styled.button``;
const PostTags = styled.div``;
const PostVotes = styled.div``;
const VoteBtn = styled.button``;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0
    };
  };
  componentDidMount() {
    console.log(this.props.postInfo.votes)
    this.setState({
      votes: this.props.postInfo.votes
    });
  }
  handleVote = (type) => {
    if (type === "up") {
      console.log(`sweet`);
      this.setState((prev) => {
        return {
          votes: prev.votes + 1
        }
      });
      console.log(this.state.votes);
    } else {
      console.log(`not cool`);
      this.setState((prev) => {
        return {
          votes: prev.votes - 1
        }
      });
      console.log(this.state.votes);
    };
    // This method may need to be moved to context so that it
    // can update the vote count in the DB
  };

  render() {
    const {topic,title,body,username,tags,created,votes} = this.props.postInfo
    const date = new Date(created).toUTCString();
    return (
      <PostWrapper>
        <PostTitle>{title}</PostTitle>
        <UNameAndTime>
          Posted by: {username} on {date}
        </UNameAndTime>
        <PostBody>{body}</PostBody>
        <PostTags>{tags.join(', ')}</PostTags>
        <PostVotes>{this.state.votes}</PostVotes>
        <VoteBtn type="up" onClick={() => this.handleVote("up")}>Sweet!</VoteBtn>
        <VoteBtn type="down" onClick={() => this.handleVote("down")}>Not Cool</VoteBtn>
        <CommentButton>Comment</CommentButton>
      </PostWrapper>
    )
  }
}

export default withPosts(Post);
