import * as React from 'react';

export const donatePath = '/donate';

export const Donate: React.FC<React.PropsWithChildren<unknown>> = (_props) => {
    return (
        <>
            <h3>Donate</h3>
            <p>
                Many thanks for considering making a donation to support the life of prayer and praise of our Community
                at Crossbush. Your generosity is very much appreciated.
            </p>

            <p>There are two ways you can contribute; by bank transfer or by cheque.</p>

            <h4>Bank Transfer</h4>
            <p>These are the details for making a bank transfer to our account:</p>
            <ul>
                <li>
                    <b>Account name:</b> Convent of Poor Clares
                </li>
                <li>
                    <b>Sort code:</b> 60-01-18
                </li>
                <li>
                    <b>Account number:</b> 96047569
                </li>
            </ul>

            <h4>Cheque</h4>
            <p>If you&apos;d like to send a cheque, please post it to:</p>
            <p>
                Convent of Poor Clares
                <br />
                Crossbush
                <br />
                Arundel
                <br />
                West Sussex
                <br />
                BN18 9PJ
            </p>
            <p>Cheques made payable to: Convent of Poor Clares</p>
        </>
    );
};
