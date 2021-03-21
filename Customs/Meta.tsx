import React from 'react';
import Head from 'next/head';

const Meta = ({title, keywords, description}: MetaPropType) => {
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
    );
};

Meta.defaultProps = {
    title: "Ethan Hicks",
    keywords: "Ethan, Hicks, ethan hicks, portfolio, software, software engineering",
    description: "My own personal portfolio website"
}

type MetaPropType = {
    title: string,
    keywords: string,
    description: string,
}

export default Meta;