// utils/columns.js
import React from "react";
import { Button } from "antd";

export const columns = (handleTagClick) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title) => <div className="text-sm font-medium">{title}</div>,
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
    render: (body) => <div className="text-sm">{body}</div>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags, record) => (
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            className="capitalize"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    ),
  },
];
