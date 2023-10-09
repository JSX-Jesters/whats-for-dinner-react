import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import placeImage from '../images/placeholder.png'




export function HomePage() {

    return(

            <Container>
              {/* Columns are always 50% wide, on mobile and desktop */}
              <Row >
                <Col md={6} className="mb-3">
                    <h2>Meal 1</h2>
                    <img src={placeImage} alt="" style={{maxHeight: '300px'}}/>
                </Col>
                <Col md={6} className="mb-3">
                    <h2>Meal 2</h2>
                    <img src={placeImage} alt="" style={{maxHeight: '300px'}}/>
                </Col>
              </Row>
            </Container>
          );
        }
        
        export default HomePage;