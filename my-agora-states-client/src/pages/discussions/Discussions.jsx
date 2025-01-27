import React, { useEffect, useState } from "react";
import { getDiscussion } from "../../api/discussions";

// blash-u 에서 사용했던 방법이랑 차이점 비교하기 : Collapse
// import Collapse from "@kunukn/react-collapse";

import "./Discussions.scss";

const Discussions = ({ newDiscussion }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    console.log(newDiscussion);
    setDiscussions([newDiscussion, ...discussions]);
  }, [newDiscussion]);

  console.log(discussions);

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
      // console.log(formattedDiscussions);
    })();
  }, []);

  const toggleShowDetail = (idx) => {
    setDiscussions((prev) => {
      const update = [...prev];

      update[idx].isOpen = true;
      // setIsOpen(true);
      return update;
    });
  };

  const toggleClosedDetail = (idx) => {
    setDiscussions((prev) => {
      const update = [...prev];

      update[idx].isOpen = false;
      // setIsOpen(false);
      return update;
    });
  };

  return (
    <div id="Discussions">
      {discussions.map((cur, idx) => (
        <>
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

              <div className="discussion_answer--contents">
                {cur.answer !== null && cur.isOpen ? (
                  <button
                    className="closed"
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
            {cur.answer ? (
              <div className="discussion_answer">✔︎</div>
            ) : (
              <div className="discussion_non-answer">❏</div>
            )}
          </div>

          {cur.isOpen && cur.answer && (
            <div className="discussion_answer--content">
              <div className="answers">
                <div className="answer_avatar">
                  <img
                    src={cur.answer.avatarUrl}
                    alt={`avatar of ${cur.answer.author}`}
                    className="answer_avatar--img"
                  />
                  <div className="answer_infomation">
                    <div className="info">{`${cur.answer.author} / ${cur.answer.createdAt}`}</div>
                  </div>
                </div>
                <div className="answer_contents">
                  <div className="answer_title">
                    <div>
                      <a href={cur.answer.url}>{cur.answer.title}</a>
                      <div className="answer_content">
                        {cur.answer.bodyHTML.replace(/<[^>]+>/g, "")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Discussions;
