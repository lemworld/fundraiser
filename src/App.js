import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


// Page Components
import Hero from './page/Hero';
import heroimage from './page/karl-fredrickson-192686.jpg';
import Main from './page/Main';
import Footer from './page/Footer';

// Stripe Components
import {StripeProvider} from 'react-stripe-elements';
import ChargeForm from './stripe/ChargeForm';

const HeroTitle = "Help send these children to college";
const Story = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus iaculis metus vitae laoreet. Vivamus consectetur arcu nisi, dictum sodales mi dignissim id. Aliquam nec accumsan orci. Maecenas vitae nunc hendrerit lorem porta lobortis. Proin eu porta eros. Duis a lobortis eros. Donec at justo eu ipsum elementum tincidunt ut aliquam diam. Vivamus a pharetra purus. Fusce mollis porta ex, eu tincidunt augue. Aliquam id diam ut ante varius suscipit.

    Pellentesque in ante gravida tellus convallis consequat. Aenean sed ex ante. Donec bibendum, ligula in consequat convallis, dui magna facilisis quam, eget tempus eros nibh non nunc. Quisque scelerisque ullamcorper felis, ullamcorper sodales felis cursus eu. Donec posuere, odio vel scelerisque accumsan, mauris enim tincidunt erat, vitae tristique augue turpis ornare elit. Cras pharetra nibh vel ipsum euismod, et elementum est rutrum. Nunc imperdiet nisi ut faucibus varius. Quisque sed vestibulum enim, ut mattis enim. Cras feugiat, diam eget sagittis rutrum, nisi quam facilisis metus, vel volutpat dui urna ut diam. Nulla ut dolor vel quam maximus efficitur. Nunc diam metus, fringilla id porta quis, suscipit vitae arcu.

    In viverra lacus quis mi varius fermentum. Praesent pellentesque aliquet arcu at ullamcorper. Fusce at suscipit nisl. Nullam aliquet eget nulla in porta. Praesent viverra sollicitudin augue. Morbi facilisis leo eros, id tristique eros sodales aliquet. Donec consectetur imperdiet tellus aliquam suscipit. In dui tellus, luctus vitae vulputate eget, fermentum a mi. Curabitur quis metus a risus convallis condimentum ut in orci.

    Donec suscipit ultricies lacus, et luctus leo elementum vitae. Integer turpis felis, lobortis ut neque ut, commodo fermentum ex. Sed vel imperdiet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut auctor libero in lectus efficitur dapibus. Pellentesque augue risus, imperdiet ut diam at, tincidunt suscipit purus. Fusce gravida sed mauris id pharetra. Sed odio libero, mattis eget est in, condimentum viverra leo. Nunc sed posuere odio, id vulputate velit.

    Pellentesque dictum, libero vel venenatis placerat, tellus lacus vestibulum purus, non dictum eros orci sit amet sapien. Morbi ullamcorper augue nec pretium fermentum. Praesent cursus dignissim neque ut ornare. Phasellus diam orci, ornare a sapien at, iaculis luctus felis. Proin vehicula id enim at ultrices. Nulla at urna non purus eleifend pulvinar. Vestibulum rhoncus leo augue, quis malesuada dui convallis ac.
`;

class App extends Component {
    render() {
        return (
            <div>
                <Hero title={HeroTitle} heroimage={heroimage} balance={10132} donors={12} />
                <Main story={Story} donors={12}></Main>
                <Footer />
            </div>
        );
    }
}

export default App;


/*

<Grid fluid={true}>
    <Row>
        <Col xs={12}>
            <StripeProvider apiKey="pk_test_12345">
                <ChargeForm />
            </StripeProvider>
        </Col>
    </Row>
</Grid>

*/
