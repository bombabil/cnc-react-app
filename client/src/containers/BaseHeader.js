import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../style/BaseHeader';
import Title from '../style/AppName';
import Button from '../style/Button';
import Row from '../style/Row';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WorldsMenu from './WorldsMenu';
import { backgroundColorButtonHeader } from '../style/constants';

const Link = Button.withComponent(
    styled(NavLink)`
        color: white !important;
        //background-color: inherit;
        border: none !important;

        &:hover {
            background-color: ${backgroundColorButtonHeader};
            transition: background 0.1s linear;
        }
    `
);

class BaseHeader extends Component {
    render() {
        const { isAuthenticated, name } = this.props;
        return (
            <Header>
                <Title>
                    <NavLink to="/">CNC-ECO</NavLink>
                </Title>
                <Row wrap>
                    {isAuthenticated && name && (
                        <>
                            <WorldsMenu />
                            <Link to="/bases" activeClassName="active">
                                Basen
                            </Link>
                            <Link to="/layouts" activeClassName="active">
                                Layouts
                            </Link>
                            <Link to="/alliance" activeClassName="active">
                                Alliance
                            </Link>
                        </>
                    )}
                    <Link to="/scripts" activeClassName="active">
                        Scripte
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/user" activeClassName="active">
                            {name || 'Add a player name first'}
                        </Link>
                    ) : (
                        <Fragment>
                            <Link to="/login" activeClassName="active">
                                Login
                            </Link>
                            <Link to="/register" activeClassName="active">
                                Sign up
                            </Link>
                        </Fragment>
                    )}
                </Row>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    name: state.player.name,
});

export default connect(mapStateToProps)(BaseHeader);
