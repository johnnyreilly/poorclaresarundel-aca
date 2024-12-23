import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import './Loading.css';

interface LoadingProps {
    noHeader?: boolean;
}

export const Loading: React.FunctionComponent<React.PropsWithChildren<LoadingProps>> = (props) =>
    props.noHeader ? (
        <>
            <FontAwesomeIcon icon={faSnowflake} spin /> Loading {props.children} ...
        </>
    ) : (
        <h1 className="loader">
            <FontAwesomeIcon icon={faSnowflake} spin /> Loading {props.children} ...
        </h1>
    );
