import React from "react";
import "./TableOfContents.css";
import { Link } from "react-router-dom";

export interface TableOfContentsProps {
  children: React.ReactNode;
}

export function TableOfContents(props: TableOfContentsProps) {
  return (
    <div className="TableOfContents">
      <div className="Contents">{props.children}</div>
    </div>
  );
}

export interface TableOfContentsItemProps {
  title: string;
  page: string | number;
  path: string;
}

export function TableOfContentsItem(props: TableOfContentsItemProps) {
  return (
    <Link to={props.path} className="TableOfContentsItem">
      <span className="Title">{props.title}</span>
      <span className="Page">{props.page}</span>
    </Link>
  );
}

export interface TableOfContentsChapterProps {
  title: string;
  children: React.ReactNode;
}

export function TableOfContentsChapter(props: TableOfContentsChapterProps) {
  return (
    <div className="TableOfContentsChapter">
      <h3 className="Title">{props.title}</h3>
      <div className="Contents">{props.children}</div>
    </div>
  );
}
