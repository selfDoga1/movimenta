import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const AppBreadcrumb = ({ items }) => {
    const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    return (
        <Breadcrumb.Item key={item}>
            {isLast ? (
                <span>{item}</span>
            ) : (
                <Link to={`/${items.slice(0, index + 1).join('/')}`}>{item}</Link>
            )}
        </Breadcrumb.Item>
    );
});

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
            <Link to="/">Home</Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
