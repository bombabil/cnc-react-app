import React, { useState, useEffect } from 'react';
import { api_url } from '../config';
import Error from '../style/Error';
import urlToBase from '../util/parseurl';
import {store} from '../index';
import { replaceAllBase } from '../store/actions/base';
import { Redirect } from 'react-router';

export const S = props => {
    const [err, setError] = useState(null);
    const { url } = props.match.params;
    const [loaded, setLoaded] = useState(false)

    async function load() {
        const item = await fetch(api_url + '/urlToBase/' + url)
            .then(r => r.json())
            .catch(e => {
                console.log('ERROR');
                console.error(e);
                setError(e.message);
            });
        console.log('after roror catch');
        console.log(item);
        if(item.url) {
            const base = urlToBase('3|' + item.faction + '|' + 'item.faction' + '|' + item.name + '|' + item.url )
            console.log(base)
            store.dispatch(replaceAllBase(base))
            setLoaded(true)
        } else {
            setError(item.error.message);
        }
        return null;
    }

    useEffect(() => {
        load();
    });

    return loaded ?
            <Redirect to="/"/>
        :(
        <div>
            loading
            <Error>{err}</Error>
        </div>
    );
};