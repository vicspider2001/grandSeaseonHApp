import React, { Component } from 'react';
import '../Reception.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import FLogin from '../../FLogin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';


const occuppancyUrl = "http://192.168.6.231:3333/checkin";
const checkInDataUrl = "http://192.168.6.231:3333/getrmstatus";
const occuppancySearchData = "http://192.168.6.231:3333/getDailyOccuppancy?";
const userName = "http://192.168.6.231:3333/fofUserInfo";
const getHotelAddress = "http://192.168.6.231:3333/hoteladdress";

class RoomOccupancy extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside ROConstructor")

        this.state = {
            occuppancyData:'',
            occuppancySearch:'',
            date:'',
            percentOcc:'',
            NumOccuppied:'',
            NumAllRms:'',
            AllRms:'',
            percentCalculated:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:'',

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:''
        }
        this.checkinhandleChange = this.checkinhandleChange.bind(this);
        

    }

    checkinhandleChange(date) {
        this.setState({
            date: date,
           

        });
    }

    renderDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.checkinhandleChange}
                    maxDate={addDays(new Date(),0)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize printing alignText112"
                    placeholderText='Select Start Date'
                />
            </div>
        )
    }

    findOccuppancySearch(){

        var searchDate = moment(this.state.date).format('MMM DD YYYY')

        this.setState({occuppancyData:''})

        fetch(`${occuppancySearchData}occuppancyToday=${searchDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            data.map((item) =>{
                this.setState({
                    occuppancyData:item.OccuppancyData
                })
                return 'ok'
            })
        
        });


    }

    resetOccupancy(){

        // var searchDate = moment(this.state.date).format('MMM DD YYYY')

        this.setState({occuppancyData:'',date:''})

        fetch(`${occuppancyUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                occuppancyData:data
            })
            
        });


    }

    renderOccupancyData(data){
        if (data){
            data.sort((a, b) => (a.roomNumbers) - (b.roomNumbers));
            return data.map((item) => {
                var arrDt = moment(item.arrivalDate).format('YYYY-DD-MMM')
                var depDt = moment(item.departureDate).format('YYYY-DD-MMM')
                return(
                    <>
                        <tr key= {item._id}>
                            <td className="table-light table-striped adjust225">{item.fname} {item.lname}</td>
                            <td className="table-light table-striped adjust222">{item.roomNumbers}</td>
                            <td className="table-light table-striped adjust225">{item.roomtypeName}</td>
                            <td className="table-light table-striped adjust20"><NumberFormat value= {item.roomRate}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust222">{item.discounType}</td>
                            <td className="table-light table-striped adjust20"><NumberFormat value= {item.discountAmount}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust20"><NumberFormat value= {item.dailyRate}thousandSeparator={true}displayType={"text"}/></td>
                            <td className="table-light table-striped adjust2">{arrDt}</td>
                            <td className="table-light table-striped adjust2">{depDt}</td>
                                    
                        </tr>
                    </>
                )
            })
        }
        else{
            return(
                <>
                    <Spinner animation="border" variant="primary" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="warning" />
                </>
            )
        }
    }
   

    render() {
        console.log(">>> Inside ROtrender", this.state)
        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }
        
        return (
            <>
                <div className="container">
                    <div>
                        <img src= "https://i.ibb.co/xfH44ry/grandseason-Logo.jpg" className="alignImg2" style={{width:"100px", height:"70px"}} alt="companylogo"/>
                    </div>
                    <center>
                        <h6>{this.state.Hotelname}</h6>
                        <p className="textSize">{this.state.Hoteladdress}</p>
                        <p className="textSize">{this.state.Hotelphone}</p>

                    </center>
                    <br/>
                    <center><h5>Room Occupancy Report</h5>
                        <div>
                            <span>
                                <label>
                                    {this.renderDate(this.state.startdate)}
                                </label>
                            </span>
                        
                            <span>
                                
                                <button className="btn btn-primary space btnadjuster printing" onClick={ () => this.findOccuppancySearch()}>Find Past</button>
                                <button className="btn btn-primary space btnadjuster printing" onClick={ () => this.resetOccupancy()}>Reset</button>
                                
                            </span>
                        </div>
                    </center>
                    <br/>
                    <table className="table table-hover">
                    
                        <thead className="table-warning">
                            <tr>
                                <th className="adjust5">Names</th>
                                <th className="adjust5">Room Num</th>
                                <th className="adjust5">Room Type</th>
                                <th className="adjust5">Room Rate(NGN)</th>
                                <th className="adjust5">Discount Type</th>
                                <th className="adjust5">Discount Amount</th>
                                <th className="adjust5">Daily Rate(NGN)</th>
                                <th className="adjust5">Arrival Date</th>
                                <th className="adjust5">Departure Date</th>
                                
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            {this.renderOccupancyData(this.state.occuppancyData)}
                        
                        </tbody>
                        <br/>
                    
                    </table>
                    <div className="row">
                        <h6>Occupancy Summary:</h6>
                        <hr/>
                        <div className="col-4">
                            <p><span className="textSize30">No. of Occupied Rooms:</span><span className="textSize31"> {this.state.NumOccuppied}</span></p>
                        </div>
                        <div className="col-4">
                            <p><span className="textSize30">Total Num of Rooms:</span><span className="textSize31"> {this.state.NumAllRms}</span></p>
                        </div>
                        <div className="col-4">
                            <p><span className="textSize30">Percentage Occupancy:</span><span className="textSize31"> {this.state.percentCalculated} %</span></p>
                        </div>
                        <hr/>
                    </div>

                    <center>
                        <button className="btn btn-warning printing" onClick={ () => window.print()}>Print</button>
                        <button className="btn btn-danger printing space" onClick={ () => this.props.history.push('/ReceptionMenu')}>Close</button>
                    </center>
                   

                </div>
            </>
        );
    }

    async componentDidMount() {
        console.log (">>> Inside ROdidMount")
        
        fetch(`${occuppancyUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({
                occuppancyData:data,
               
            
            })
            
        })
        fetch(`${checkInDataUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({
                percentOcc:data.map(item => item.roomStatus).filter(item=> item !=='green'&& item !=='black'),
                AllRms:data.map(item => item.roomStatus).filter(item=> item) 
            
            })
            var occuppiedRooms=this.state.percentOcc;
            var occuppied = occuppiedRooms.length;
            this.setState({NumOccuppied:occuppied});

            var AllRooms=this.state.AllRms;
            var AllRms = parseInt(AllRooms.length);
            this.setState({NumAllRms:AllRms});
            

            var percOcc = 0;
            percOcc = percOcc + parseFloat(this.state.NumOccuppied) / parseFloat(this.state.NumAllRms) * 100;
            this.setState({percentCalculated:percOcc.toFixed(2)})
            
        })

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
            })
            
        })

        fetch(`${getHotelAddress}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({
                    Hotelname:item.HotelName,
                    Hoteladdress:item.Address,
                    Hotelphone:item.Phone
                
                })
                return 'ok'
            })
            
        })

        this.myTimer = setTimeout(() => {

            var loginInfo = this.state.loginDetails;
            var nameDetails = this.state.name;
            if(loginInfo.some(item => item.name === nameDetails)){
                this.setState({Blogin:true})
            }
            else{
                this.setState({Blogin:false})
            }
        },1000);
       

    }
}

export default RoomOccupancy;