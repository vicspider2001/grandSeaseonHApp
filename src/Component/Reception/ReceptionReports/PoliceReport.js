import React, { Component } from 'react';
import '../Reception.css';
import moment from 'moment';
import FLogin from '../../FLogin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';



const policeReportUrl = "http://192.168.6.231:3333/checkin";
const userName = "http://192.168.6.231:3333/fofUserInfo";
const getHotelAddress = "http://192.168.6.231:3333/hoteladdress";
const occuppancySearchData = "http://192.168.6.231:3333/getDailyOccuppancy?";


class PoliceReport extends Component {
    constructor(props) {
        super(props);
        console.log(">>>Inside ROConstructor")

        this.state = {
            PoliceRepData:'',
            occuppancySearch:'',
            date:'',
            total:'',
            counted:'',
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

        this.setState({PoliceRepData:''})

        fetch(`${occuppancySearchData}occuppancyToday=${searchDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            data.map((item) =>{
                this.setState({
                    PoliceRepData:item.OccuppancyData,
                    
                    
                })

                return 'ok'
            })
        
        });


    }

    resetOccupancy(){

        // var searchDate = moment(this.state.date).format('MMM DD YYYY')

        this.setState({PoliceRepData:'',date:''})

        fetch(`${policeReportUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                PoliceRepData:data,
                
            })
            
            
        });


    }

    renderpoliceReport(data){
        if (data){
            return data.map((item) => {
                var arrDt = moment(item.arrivalDate).format('YYYY-DD-MMM')
                var depDt = moment(item.departureDate).format('YYYY-DD-MMM')
                return(
                    <>
                        <tr key= {item._id}>
                            <td className="table-light table-striped adjust2">{item.title}. {item.fname} {item.lname}</td>
                            <td className="table-light table-striped adjust2">{item.phone}</td>
                            <td className="table-light table-striped adjust2">{item.email}</td>
                            <td className="table-light table-striped adjust2">{item.occupation}</td>
                            <td className="table-light table-striped adjust2">{arrDt}</td>
                            <td className="table-light table-striped adjust2">{depDt}</td>
                            <td className="table-light table-striped adjust2">{item.comingFrom}</td>
                            <td className="table-light table-striped adjust2">{item.goingTo}</td>
                            <td className="table-light table-striped adjust2">{item.POV}</td>
                                    
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
        var rooms = this.state.PoliceRepData;
        var occuppied = rooms.length;
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
                    <center>
                        <h5>Police Report</h5>

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
                                <th className="adjust5">Phone</th>
                                <th className="adjust5">Email</th>
                                <th className="adjust5">Occupation</th>
                                <th className="adjust5">Arrival Date</th>
                                <th className="adjust5">Departure Date</th>
                                <th className="adjust5">Coming From</th>
                                <th className="adjust5">Going To</th>
                                <th className="adjust5">Purpose of Visit</th>
                                
                                        
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            {this.renderpoliceReport(this.state.PoliceRepData)}
                        
                        </tbody>
                        <br/>
                    
                    </table>
                    <div className="row">
                        <h6>Police Report Summary:</h6>
                        <hr/>
                        <div className="col-4">
                            <p><span className="textSize30">No. of Guests:</span><span className="textSize31"> {occuppied} Guests</span></p>
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
        
        fetch(`${policeReportUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({
                PoliceRepData:data,
                
               
            })
            
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

export default PoliceReport;