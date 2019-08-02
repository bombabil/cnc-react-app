import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../style/Input';
import {
    changeAuthEmail,
    changeAuthPassword,
    requestEmail,
    resetPassword,
} from '../store/actions/auth';
import InputGroup from '../style/InputGroup';
import Label from '../style/Label';
import Container from '../style/Container';
import Form from '../style/Form';
import Submit from '../style/Submit';
import Center from '../style/Center';
import Alert from '../style/Alert';

function Reset(props) {
    const {
        email,
        password,
        error,
        isAuthenticated,
        changeEmail,
        changePassword,
        requestEmail,
        resetPassword,
        playerName,
        match,
        location,
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        // todo remove comment below
        !token ? requestEmail() : resetPassword(token);
    }
    const { token } = match.params
    console.log(match, location)

    return !isAuthenticated ? (
        <Center>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1>Reset password</h1>
                    <Alert>In Progress - don't use</Alert>
                    {error && <Alert>{error}</Alert>}
                    {!token ? <InputGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            value={email}
                            onChange={e => changeEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                    </InputGroup>
                    : <InputGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            value={password}
                            onChange={e => changePassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            minLength="4"
                        />
                    </InputGroup> }
                    <InputGroup>
                        <Submit type="submit" value={token ? 'Update password' : 'Send email'} />
                    </InputGroup>
                    <div>New to CnC-Exo?</div>
                    <Link to="/register">Sign Up</Link>
                    <br />
                    <br />
                    <div>Email verification expired?</div>
                    <Link to="/resend">Resend token</Link>
                </Form>
            </Container>
        </Center>
    ) : playerName ? (
        <Redirect to="/" />
    ) : (
        <Redirect to="/user2" />
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated && state.auth.isVerified,
        playerName: state.player.name,
    };
}

const mapDispatchToProps = {
    changeEmail: changeAuthEmail,
    changePassword: changeAuthPassword,
    requestEmail,
    resetPassword,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reset);
