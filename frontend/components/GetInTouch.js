import React from 'react'
import ContactForm from './contact-form1'
import {Container, Row, Col} from "react-bootstrap"

const GetInTouch = () => {
  return (
    <section className='commonSection'>
    <Container>
        <Row>            
            <Col lg={12} style={{ boxShadow:" -2px 4px 30px 0px rgba(0, 0, 0, 0.3)"}}>
                <ContactForm />
            </Col>
        </Row>
    </Container>
    </section>
  )
}

export default GetInTouch