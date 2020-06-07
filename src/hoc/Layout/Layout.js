import React, { Fragment } from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import CmeNavBar from '../../components/Navigation/NavBar/NavBar';

const Layout = (props) => {
    return (
        <Fragment>
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col>
                        <CmeNavBar />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        {props.children}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Layout;
