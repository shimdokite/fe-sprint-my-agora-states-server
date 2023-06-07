import React, { useEffect, useState } from "react";
import { getDiscussion } from "../../api/discussions";

import "./Discussions.scss";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getDiscussion();
      const formattedDiscussions = res.map((discussion) => ({
        id: discussion.id,
        createdAt: discussion.createdAt,
        url: discussion.url,
        author: discussion.author,
        title: discussion.title,
        avatar: discussion.avatarUrl,
        answer: discussion.answer,
        isDetailShow: false, // 각 항목의 상세 정보 표시 여부 상태값
      }));
      setDiscussions(formattedDiscussions);
      console.log(formattedDiscussions);
    })();
  }, []);

  const toggleShowDetail = (idx) => {
    setDiscussions((prev) => {
      const update = [...prev];
      console.log(update[idx].isDetailShow);
      update[idx].isDetailShow = true;
      return update;
    });
  };

  const toggleClosedDetail = (idx) => {
    setDiscussions((prev) => {
      const update = [...prev];
      console.log(update[idx].isDetailShow);
      update[idx].isDetailShow = false;
      return update;
    });
  };

  return (
    <div id="Discussions">
      {discussions.map((cur, idx) => (
        <div className="discussions" key={`${cur.id}${idx}`}>
          <div className="discussion_avatar--wrapper">
            <img
              src={cur.avatar}
              alt={`avatar of ${cur.author}`}
              className="discussion_avatar--img"
            />
          </div>
          <div className="discussion_contents">
            <div className="discussion_title">
              <div>
                <a href={cur.url}>{cur.title}</a>
              </div>
            </div>
            <div className="discussion_infomation">
              <div className="info">{`${cur.author} / ${cur.createdAt}`}</div>
            </div>
          </div>
          {cur.answer ? (
            <div className="discussion_answer">☑</div>
          ) : (
            <div className="discussion_non-answer">❏</div>
          )}
          <div className="discussion_answer--contents">
            {cur.isDetailShow ? (
              <button
                className="showDetail"
                onClick={() => toggleClosedDetail(idx)}
              >
                Closed
              </button>
            ) : (
              <button
                className="showDetail"
                onClick={() => toggleShowDetail(idx)}
              >
                Show Detail
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    // <div>app</div>
  );
};

export default Discussions;
