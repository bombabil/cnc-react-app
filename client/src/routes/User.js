import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { api_url } from '../config';
import { changeWorld, updatePlayer } from '../store/actions/player';
import { logout } from '../store/actions/auth';
import Button from '../style/Button';
import LoadingPoints from '../style/LoadingPoints';
import Title from '../style/Title';
import Label from '../style/Label';
import { InfoText } from '../style/InfoText';
import Row from '../style/Row';
import Body from '../style/Body';
import Container from '../style/Container';
import Alert from '../style/Alert';
import BodySide from '../style/BodySide';
import Info from '../style/Info';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sizes } from '../style/constants';
import Column from '../style/Column';

const PlayerName = styled.div`
    font-weight: 600;
    font-size: 2.5rem;
`;

const Middle = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media ${sizes.mobile} {
        flex-direction: column;
    }
`;

function User(props) {
    const { _id, authToken, name, worlds, worldId } = props;
    const query = qs.parse(props.location.search);
    const [deleteSecure, setDeleteSecure] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token] = useState(query.token);
    const [error, setError] = useState(query.error);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.warn('USE EFFECT');
        async function addPlayer() {
            console.log('add player');
            setLoading(true);

            const res = await fetch(api_url + '/user/addPlayerName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: 'Bearer  ' + authToken,
                },
                body: JSON.stringify({ token }),
            }).catch(e => {
                console.warn('catched error');
                console.error(e);
            });
            const user = await res.json();
            console.log({ user });
            setLoading(false);
            if (!res.ok || user.error) {
                return setError(user.error.message);
            }
            if (user) {
                props.updatePlayer(user, true);
                setSuccess('player successfully added');
            }
        }
        token && addPlayer();
    }, []);

    const deleteUser = async () => {
        if (!deleteSecure) return setDeleteSecure(true);
        setLoading(true);

        const res = await fetch(api_url + '/user/' + _id, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + authToken,
            },
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
            setError(e.message);
        });
        setLoading(false);
        const result = await res.json();
        if (!res.ok || result.error) {
            return setError(result.error.message);
        }
        if (result.error) return setError(result.message);
        console.log(result);
        props.logout();
    };

    const updateWorlds = async () => {
        console.log('add updateWorlds');
        if (!name) return setError('add player name first');
        setLoading(true);
        setSuccess('');

        const res = await fetch(api_url + '/user/updateWorlds', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer  ' + authToken,
            },
        }).catch(e => {
            console.warn('catched error');
            console.error(e);
        });
        const user = await res.json();
        console.log({ user });
        setLoading(false);
        if (!res.ok || user.error) {
            return setError(user.error.message);
        }
        if (user) {
            props.updatePlayer(user, true);
            setSuccess('worlds updated');
        }
    };

    const playerAdded = !!name;

    return (
        <Body>
            <div />
            <Middle>
                {error && <Alert>{error}</Alert>}

                <Column>
                    <Container>
                        <Label htmlFor="name">Player name: {name}</Label>
                        {!name && (
                            <>
                                <InfoText>
                                    <Link to="/scripts">
                                        <b>cnc-eco script</b>
                                    </Link>
                                    &#160; must be installed first
                                </InfoText>
                                <InfoText>
                                    Click ingame 'get token' in the menu to add your data to your
                                    account
                                </InfoText>
                            </>
                        )}
                    </Container>

                    <Container>
                        <Title>Logout</Title>
                        <Button onClick={props.logout}>logout</Button>
                    </Container>

                    <Container>
                        <Title>{!deleteSecure ? 'Delete Account' : 'Are you sure?'}</Title>
                        {!deleteSecure ? (
                            <Button red onClick={deleteUser}>
                                DELETE
                            </Button>
                        ) : (
                            <Row>
                                <Button onClick={() => setDeleteSecure(false)}>No</Button>
                                <Button red onClick={deleteUser}>
                                    Yes
                                </Button>
                            </Row>
                        )}
                    </Container>
                </Column>
                <Column>
                    <Container>
                        <Title>Worlds</Title>
                        <LoadingPoints loading={loading} />
                        {worlds.length !== 0 &&
                            worlds.map(w => (
                                <Button
                                    key={w.worldId}
                                    onClick={() => props.changeWorld(w)}
                                    active={worldId === w.worldId}
                                >
                                    {w.worldName}
                                </Button>
                            ))}
                        <br />
                        {success && <Info>{success}</Info>}
                        <Button onClick={updateWorlds}>Update worlds</Button>
                    </Container>
                </Column>
            </Middle>
            <BodySide>{!playerAdded && <></>}</BodySide>
        </Body>
    );
}

const mapStateToProps = state => ({
    _id: state.auth.user_id,
    name: state.player.name,
    authToken: state.auth.token,
    worlds: state.player.worlds,
    worldId: state.player.w,
});

const mapDispatchToProps = {
    logout,
    updatePlayer,
    changeWorld,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
