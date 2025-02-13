import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import backArrow from "../assets/icons/arrowleftblue.svg"

const projects = [
  {
    title: 'CoinPay mobile App',
    description: 'CoinPay is a mobile app for seamless, secure cryptocurrency payments and transfers. Manage, send, and receive crypto instantly with an intuitive, user-friendly interface.',
    imageUrl: 'https://cdn.dribbble.com/userupload/4274903/file/original-1171193ce6dc31fddb0a3c879155978e.jpg?resize=752x',
    githubUrl: 'https://github.com/Semzycoded/Coinpay-Mobile-App',
    liveDemoUrl: 'https://coinpay-mobile-app.vercel.app/',
  },
  {
    title: 'food-recipe-website',
    description: 'It is a vibrant food recipe website offering easy, delicious recipes for all skill levels. Discover your favorite dishes in just a few clicks!',
    imageUrl: 'https://vercel.com/api/toolbar/link/food-recipe-website-one.vercel.app?via=new-project-success&p=1&page=/',
    githubUrl: 'https://github.com/Semzycoded/food-recipe-website',
    liveDemoUrl: 'https://food-recipe-website-one.vercel.app',
  },
  // Add more projects as needed
];

const Project = () => {
  return (
    <div className='my-5'>

    <Container className="mt-5">
 <div style={{marginTop:"5vh",position:"absolute"}}>
                        <NavLink className="nav-link active" id="pills-home-tab" data-toggle="pill" to="/about" role="tab" aria-controls="pills-home" aria-selected="true">
                            <img src={backArrow} alt="" />
                            </NavLink>
                    </div>
                <div className="row">
                    <div className="col-12 text-center py-4 mb-5">
                    <h1>Project</h1>
                    <hr />
                    </div>
                </div>
      <Row>
        {projects.map((project, index) => (
          <Col key={index} lg={4} md={6} className="mb-4">
            <Card style={{width:"400px", height:"400px"}}>

              <Card.Img variant="top" src={project.imageUrl} alt={project.title} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="primary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Button>
                {project.liveDemoUrl && (
                  <Button variant="success" className="ml-4" href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default Project;
