/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Head from '@docusaurus/Head';
import DocPaginator from '@theme/DocPaginator';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

function DocItem(props) {
  const {siteConfig = {}} = useDocusaurusContext();
  const {url: siteUrl, title: siteTitle} = siteConfig;
  const {content: DocContent} = props;
  const {metadata} = DocContent;
  const {
    description,
    title,
    permalink,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
  } = metadata;
  const {
    frontMatter: {image: metaImage, keywords, hideTitle},
  } = DocContent;

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  let metaImageUrl = siteUrl + useBaseUrl(metaImage);
  if (!isInternalUrl(metaImage)) {
    metaImageUrl = metaImage;
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
      </Head>
      <main className="col col-md-8 p-0 mt-5 overflow-hidden">
        <div className="row no-gutters justify-content-between">
          {!hideTitle && (
            <header>
              <h2>{title}</h2>
            </header>
          )}
          {editUrl && (
            <a href={editUrl} target="_blank" rel="noreferrer noopener">
              <svg
                fill="currentColor"
                height="1.2em"
                width="1.2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 40"
                style={{
                  marginRight: '0.3em',
                  verticalAlign: 'sub',
                }}>
                <g>
                  <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
                </g>
              </svg>
              Edit this page
            </a>
          )}
        </div>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <div className="row no-gutters mb-5">
            <em>
              <small className="text-muted">
                Last updated{' '}
                {lastUpdatedAt && (
                  <>
                    on{' '}
                    <time
                      dateTime={new Date(lastUpdatedAt * 1000).toISOString()}>
                      {new Date(lastUpdatedAt * 1000).toLocaleDateString()}
                    </time>
                    {lastUpdatedBy && ' '}
                  </>
                )}
                {lastUpdatedBy && (
                  <>
                    by <strong>{lastUpdatedBy}</strong>
                  </>
                )}
                {process.env.NODE_ENV === 'development' && (
                  <div>
                    <small> (Simulated during dev for better perf)</small>
                  </div>
                )}
              </small>
            </em>
          </div>
        )}
        <DocContent />
        <DocPaginator metadata={metadata} />
      </main>
    </>
  );
}

export default DocItem;
