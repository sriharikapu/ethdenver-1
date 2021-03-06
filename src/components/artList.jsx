import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Input } from 'semantic-ui-react';
import Rodal from 'rodal';
import ArtCard from './artCard';
import { toast } from 'react-toastify';
import '../css/artList.css'
import 'rodal/lib/rodal.css';

const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
class ArtList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            selected: {}
        }
        this.selectArt = this.selectArt.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.buyArtwork = this.buyArtwork.bind(this);
    }
    componentWillMount() {
        // this.setState({
        //     artWorks:[
        //         {title:"First Art",price:"5", creator:"Artsy Guy",description: defaultDescription, forSale:true,
        //         imgUrl:"https://i1.wp.com/deafnetwork.com/wordpress/wp-content/uploads/2017/05/DigitalArts2017.jpg"},
        //         {title:"Second Art",price:"3.2",creator:"Awesome Creator",description:defaultDescription, forSale:false,
        //         imgUrl:"https://www.creativegaga.com/wp-content/uploads/2016/12/ShinjoP_Feature-1200x675.jpg"},
        //         {title:"Third Art",price:"5.9",creator:"Magic Trick",description:defaultDescription, forSale:true,
        //         imgUrl:"https://d1xfgk3mh635yx.cloudfront.net/sites/default/files/image/featured/1033249-rebelle-2-delivers-realistic-watercolor-tools-digital-artists.jpg"}
        //     ]
        // })
    }
    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }
    selectArt(index) {
        this.show();
        this.setState({
            selected:this.props.artWorks[index]
        });
    }
    buyArtwork() {  
        if(!this.state.selected.forSale){
            toast(("Artwork not for sale."),{
                type:"warning"
            })
        }else{
            console.log("Buying artwork for")
            console.log(this.state.selected);
        }
    }
    render() {
        const customStyles = {
            width: 'auto',
            height: 'auto',
            overflow:'scroll',
            margin: 0
        }
        return(
            <div className="artList-container">
                <Grid columns='equal' stackable={true} >
                    <Grid.Row centered columns={3} className="artList-row-container">
                        {this.props.artWorks.map((art, index) => {
                            return (
                                <Grid.Column key={index} onClick={() => {
                                    this.selectArt(index);
                                }}>
                                    <div className="artList-card-container"><ArtCard art={art} /></div>
                                </Grid.Column >
                            )
                        })}
                    </Grid.Row>
                </Grid>
                <Rodal 
                    customStyles={customStyles}
                    visible={this.state.visible}
                    animation="door"
                    onClose={this.hide.bind(this)}
                >
                    <div className="box-container">
                        <div className="modal-header"><h1 className="modal-title">{this.state.selected.title}</h1></div>
                        <div className="modal-image"><img src={this.state.selected.imgUrl}/></div>
                        <div className="modal-body"><p>{this.state.selected.description}</p></div>
                        <div className="modal-footer"><h4>{this.state.selected.forSale ? this.state.selected.price+" ETH" : "Not For Sale"}</h4></div>
                        <button className="rodal-cancel-btn" onClick={this.hide.bind(this)}>Close</button>
                        <button className="rodal-confirm-btn" onClick={this.buyArtwork}>Buy</button>
                    </div>
                </Rodal>
            </div>
        )
    }
}


export default ArtList;