import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import './Reception.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import FLogin from '../FLogin';
import 'bootstrap/dist/css/bootstrap.min.css';



const GetReservationID = "http://192.168.6.231:3333/reservation?resavtnID=";
const PutReservation ="http://192.168.6.231:3333/reservatn"
const DelReservation ="http://192.168.6.231:3333/resvntdel"
const RoomUrl2 = "http://192.168.6.231:3333/getrmstatus";
const RoomUrl3 = "http://192.168.6.231:3333/newRoomStat?wrtRmNum=";
const userName = "http://192.168.6.231:3333/fofUserInfo";
const getRSVPwrtDt = "http://192.168.6.231:3333/getReservationBydate?selectDate=";

class EditReservation extends Component {
    constructor(props) {
        super(props);

        console.log(">>> inside ERsvCobtructor", props)

       
        this.state = {
            eventsedit:[],
            displayeventsedit: [],
            displaysearch: '',
            searchByName: '',
            searchByDate:'',
            searchByNumber: '',
            displayAllRoomNums:'',
            edit: false,
            checkIn: false,
            _id:'',
            resID:'',
            fname:'',
            lname:'',
            allDay:'',
            end:'',
            start:'',
            room:'',
            title:'',
            start2:'',
            end2:'',
            phone:'',
            rsvAmount:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            login:'',
            Blogin:''


            
            
        };
        this.starthandleChange = this.starthandleChange.bind(this);
        this.endhandleChange = this.endhandleChange.bind(this);
    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        
    }

    onOpenModaledit(){
        this.setState({
            edit: true
        })
        fetch(`${GetReservationID}${sessionStorage.getItem('getRsID')}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item) => {
                var startDt = moment(item.start).format('YYYY-DD-MMM')
                var endDt = moment(item.end).format('YYYY-DD-MMM')
                this.setState({
                    _id:item._id,
                    resID:item.resID,
                    fname:item.fname,
                    lname:item.lname,
                    allDay:item.allDay,
                    end:endDt,
                    start:startDt,
                    room:item.room,
                    phone:item.phone
                    
                })
                return 'ok'
            })  
            
        })
        
    }

    onOpenModalcheckin(){
        var id = sessionStorage.getItem('getRoomNum');
        fetch(`${RoomUrl3}${id}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
           data.map((item) =>{
               if(item.fname||item.lname||item.roomStatus!=='green'){
                   alert("Room "+item.roomNumbers+" is currently occupied or needs cleaning");
                    this.props.history.push('/EditReservation')
               }
               
               if(item.roomStatus==='green'){
                this.props.history.push(`/form/${sessionStorage.getItem('getRoomNum')}`)
               }
               return 'ok'
           })
            
        })
        
       
    }

    onCloseModaledit(){
        this.setState({
            edit: false,
            
        })
        fetch(`${GetReservationID}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                eventsedit:data
            })
            
        })

    }

    onCloseModalcheckin(){
        this.setState({
            checkIn: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }

    handleSearchChangeByName = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })

        if(e.target.value === ""){
            this.setState({displayeventsedit: ''})
        }

        else{this.filterItemsByName();}

        
    }

    // handleSearchChangeByDate = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })

    //     this.filterItemsByDate();
    // }

    starthandleChange(date) {
        this.setState({
            start2: date
        });

        if(this.state.searchByDate === "") {
            this.setState({displayeventsedit: ''})
        }


        else{this.filterItemsByDate();}
        
    }

    renderstartDate() {
        return (
            <div>
                <DatePicker
                    selected={this.state.start2}
                    onChange={this.starthandleChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(),26)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize53"
                    placeholderText="Edit Arrival"
                />
            </div>
        )
    }

    renderstartDateSearch() {
       
        return (
            <div>
                <DatePicker
                    selected={this.state.searchByDate}
                    onChange={this.handleSearchChangeByDate}
                    dropdownMode="select"
                    dateFormat="yyyy-dd-MMM"
                    className="form-control mb-3 formsize53"
                    placeholderText="Search by Date"
                />
            </div>
        )
    }

    handleSearchChangeByNumber = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if(e.target.value === "") {
            this.setState({displayeventsedit: ''})
        }

        else{this.filterItemsByPhone();}

        
    }

    handleSearchChangeByDate = (date) => {
        
        this.setState({
            searchByDate: date
            
        });

        setTimeout(() => {
            if(this.state.searchByDate === "") {
                this.setState({displayeventsedit: ''})
            }
            else{
                const findDt = moment(this.state.searchByDate).format('YYYY-DD-MMM')
                fetch(`${getRSVPwrtDt}${findDt}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({displayeventsedit:data});
            

                });
            }
            
        }, 1000);

        

       

        
    }

    filterItemsByName(){
        const searchItems = this.state.eventsedit;
        const searchName = this.state.searchByName;

        const filterN = searchItems.filter(
            item => item.fname.toLowerCase().includes(searchName.toLowerCase()) ||
            item.lname.toLowerCase().includes(searchName.toLowerCase())
        );
        this.setState({displayeventsedit: filterN})
        
        
    }


    
    filterItemsByPhone(){
        const searchItems = this.state.eventsedit;
        const searchPhone = this.state.searchByNumber;
        const filterN = searchItems.filter(item => item.phone.toLowerCase().includes(searchPhone.toLowerCase()));
    
        this.setState({displayeventsedit: filterN})
    }

    handleChange2(){
        if(this.state.room!==''||this.state.fname!==''){
            var newtitle =(this.state.room+  ' '   +this.state.fname+  ' '  +this.state.lname+ ' ' +this.state.phone)
            this.setState({title:newtitle})
        }
        
        if(this.state.start2===''&&this.state.end2===''){
            var start3 = new Date(this.state.start);
            var end3 = new Date(this.state.end);
            this.setState({
                start2:start3,
                end2:end3
            })
        }

        
    }

    

    handleroomData2=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
            allDay:true
        })
       
        
    }

    

    endhandleChange(date) {
        this.setState({
            end2: date
        });
    }

    
    
    renderendDate() {
        return (
            <div >
                <DatePicker
                    selected={this.state.end2}
                    onChange={this.endhandleChange}
                    minDate={addDays(this.state.start2,1)}
                    maxDate={addDays(new Date(),31)}
                    dropdownMode="select"
                    dateFormat="MMM/d/ yyyy"
                    className="form-control mb-3 formsize53 moveagain"
                    placeholderText="Edit Departure"
                />
            </div>
        )
    }

    
    async handleResvUpdate() {
       
        try {
            var id = sessionStorage.getItem('getRsID')
           
            var resUpdate = {
                
                resID:`${this.state.resID}`,
                fname:`${this.state.fname}`,
                lname:`${this.state.lname}`,
                allDay:`${this.state.allDay}`,
                end:moment(`${this.state.end2}`).format('YYYY-DD-MMM'),
                start:moment(`${this.state.start2}`).format('YYYY-DD-MMM'),
                title:`${this.state.title}`,
                phone:`${this.state.phone}`,
                room:`${this.state.room}`
            }
            let result = await fetch(`${PutReservation}/${id}`, {
                method: 'put',
    
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
    
                body: JSON.stringify(
                    
                    resUpdate
                        
                )
                    
            });
            console.log('result>  ' + result)
            alert("Reservation updated for Room " +this.state.title);
            this.setState({
                fname:'',
                _id:'',
                lname:'',
                allDay: true,
                start: '',
                end: '',
                end2:'',
                start2:'',
                room: '',
                title:'',
                phone:'',
                displayAllRoomNums:'',
                eventsedit:''
            })
          
            
        } catch(e) {
            console.log(e)
        }

    }

    renderVacantRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                if(item.roomStatus==="green"){
                    return(
                        <>
                            <option key={index} value={item.roomNumbers}>
                                {item.roomNumbers} - {item.roomtypeName}
                            </option>
                        </>
                    )
                }
                else{
                    return(
                        <>
                           
                        </>
                    )
                }
                
            })
        }
    }

    deletRSV(){
        let delcodersv = sessionStorage.getItem('getRsID')
        fetch(`${DelReservation}/${delcodersv}`, {
            method: 'delete',

                            
        });
        alert('Reservation Cancelled')
    }

    renderEvents=(data)=>{
        if(data){
            
            data.sort((a, b) => new Date(a.start) - new Date(b.start));
            return data.map((item)=>{
                var startfmt = moment(item.start).format('YYYY-DD-MMM')
                var endfmt = moment(item.end).format('YYYY-DD-MMM')
                var Tdatefmt = moment(item.Tdate).format('YYYY-DD-MMM')
                return(
                    <>
                        <tr key= {item._id}>
                                
                            <td className="table-light table-striped adjust2xxxx">{startfmt}</td>
                            <td className="table-light table-striped adjust2xxxx">{endfmt}</td>
                            <td className="table-light table-striped adjust2xxxx">{Tdatefmt}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.fname}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.lname}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.phone}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.room}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.rsvAmount}</td>
                            <td className="table-light table-striped adjust2xxxx">{item.memo}</td>
                            <td className="table-light table-stripedadjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getRsID', item.resID)} onClick={()=>{this.onOpenModaledit()}}>Edit</button></td>
                            <td className="table-light table-stripedadjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>sessionStorage.setItem('getRsID', item.resID)} onClick={()=>{this.deletRSV()}}>Cancel</button></td>
                            <td className="table-light table-striped adjust10"><button className="btn btn-primary textcolor" onMouseOver={()=>{sessionStorage.setItem('getRoomNum', item.room);sessionStorage.setItem('getrsvAmount', item.rsvAmount);sessionStorage.setItem('getrsvCode', item.resID)}} onClick={()=>{this.onOpenModalcheckin()}}>Check in</button></td>
                                
                        </tr>
                    </>
                )
                
            })
            
        }
           
    }

    
    render() {
        console.log (">>> Inside ERsvdetails", this.state)

        if(localStorage.getItem('userInfo')==null||this.state.Blogin===false){
            return(
                <>
                    <FLogin/>
                </>
            )

        }

        return (
            <div  className="background993">
                <div className="row">
                        <div className="col-3">
                            <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-50px'}}>Hotel Reservation </h4>
                        </div>
                        <div className="col-6">
                            <h6 style = {{color:'purple',marginLeft:'480px', marginBottom:'-50px'}}>Welcome, {localStorage.getItem('userInfo').split(' ')[0]} </h6>
                        </div>
                        <div className="col-3">
                            <h6  type="button" style = {{color:'yellow',marginLeft:'180', textAlign:'left', marginBottom:'-50px'}} onClick={()=>this.logout()}>Logout </h6>
                        </div>
                </div>
                <h4 style = {{color:'rgb(23, 23, 71)',marginLeft:'50px', marginBottom:'-40px'}}> </h4>
                
                <div className="formdesign510">
                    
                    <div className="row">
                        
                        <div className="col-2">
                            <input type="text" className="form-control mb-3 formsize51" name="searchByName" require placeholder="Search By Name" value={this.state.searchByName} onChange={this.handleSearchChangeByName}/>
                        </div>
                        <div className="col-2">
                            <input type="number" className="form-control mb-3 formsize51" name="searchByNumber" require placeholder="Search By Phone" value={this.state.searchByNumber} onChange={this.handleSearchChangeByNumber}/>
                        </div>

                        {/* <div className="col-2">
                            <input type="date" className="form-control mb-3 formsize51" name="searchByDate" require placeholder="Search By Date" value={this.state.searchByDate} onChange={this.handleSearchChangeByNumber}/>
                        </div> */}

                        <div className="col-2">
                            <label>
                                {this.renderstartDateSearch(this.state.searchByDate)}
                            </label>
                        </div>
                        {/* <div className="col-2">
                            <label>
                                {this.renderendDate(this.state.end)}
                            </label>
                        </div> */}
                        {/* <div className="col-2">
                            <input type="number" className="form-control mb-3 formsize51" name="rsvAmount" require placeholder="Enter Amount" value={this.state.rsvAmount} onChange={this.handlePayMethData}/>
                        </div>
                        <select type ="button" className="form-select formsize3bb mb-2 btn btn-primary mt-3 spaceleft" name="paymentMethod" onChange={this.handleChange}>
                            <option selected value=''>Payment Method</option>
                            {this.renderPayMeth(this.state.displayPaymentMethods)}
                        </select>
                        <div className="col-2">
                            <textarea type="text" className="form-control mb-3 textareawidth formsize51" name="memo" rows='2' require placeholder="Enter Comment" value={this.state.memo} onChange={this.handleChange}/>
                        </div>
                        <center>
                            <span>
                                <button disabled={this.state.fname===''||this.state.room===''||this.state.phone===''||this.state.start===''||this.state.end===''||this.state.paymentMethod==='' || this.state.rsvAmount === ''} className="btn btn-warning" onClick={ () => this.onOpenOthrsModal ()} >Reserve</button>
                                <button className="btn btn-primary gap" onClick={ () => this.props.history.push('./EditReservation')}>Goto Reservation</button>
                                <Link to="/roomchart">
                                    <button className="btn btn-danger space">Close</button>
                                </Link>
                            </span>
                        </center> */}
                        
                        
                    </div>
                    
                    
                    <div>
                        <table className="table table-hover">
                        
                            <thead className="table-warning">
                                <tr>
                                    <th className="adjust5">Arrival Date</th>
                                    <th className="adjust5">Departure Date</th>
                                    <th className="adjust5">Reservation Date</th>
                                    <th className="adjust5">Firstname</th>
                                    <th className="adjust5">Surname</th>
                                    <th className="adjust5">Phone Num</th>
                                    <th className="adjust5">Room Num</th>
                                    <th className="adjust5">Amount</th>
                                    <th className="adjust5nwww">Comment</th>
                                    <th className="adjust5">Edit</th>
                                    <th className="adjust5">Cancel</th>
                                   <th className="adjust5">Check in</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover">
                                {this.renderEvents(this.state.displayeventsedit)}
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <center><button className="btn btn-danger" onClick={()=>{sessionStorage.removeItem('getrsvAmount'); localStorage.removeItem('rsvpNwDte');  this.props.history.push("/Reservation")}}>Close</button></center>
                    
                <Modal open={this.state.edit} onClose={()=>this.onCloseModaledit()}>
                    
                    <div className = "background591">
                        <h4 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Edit Reservation</h4>
                        <div className="formdesign511">
                        
                            <div className="row">
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53" name="fname" value={this.state.fname} onChange={this.handleroomData2}/>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53" name="lname" value={this.state.lname} onChange={this.handleChange}/>
                                </div>

                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize53" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                                <div className="col-3">
                                    <input type="number" className="form-control mb-3 formsize53" name="rsvAmount" value={this.state.rsvAmount} onChange={this.handleChange}/>
                                </div>

                                <select className="form-select  mb-3 formsize53" name="room" onChange={this.handleChange}>
                                    <option defaultValue=''>{this.state.room}</option>
                                    {this.renderVacantRooms(this.state.displayAllRoomNums)}
                                </select>
                                
                
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53 adjustText" name="start" value={moment(this.state.start).format('YYYY-DD-MMM')} readOnly/>
                                        
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control mb-3 formsize53 adjustText" name="end" value={moment(this.state.end).format('YYYY-DD-MMM')} readOnly/>
                                        
                                </div>
                                <div className="col-3">
                                    <label>
                                        {this.renderstartDate(this.state.start2)}
                                    </label>  
                                </div>
                                <div className="col-3">
                                    <label>
                                         {this.renderendDate(this.state.end2)}
                                    </label>  
                                </div>
                                                              
                               
                            </div>
                        </div> 
                        <br/><br/>
                        <center>
                            <span>
                                <button className="btn btn-warning space2" onMouseOver={()=>this.handleChange2()} onClick={()=>this.handleResvUpdate()}>Save</button>
                                        
                                <button className="btn btn-danger space3" onClick={()=>{this.onCloseModaledit(); this.props.history.push("/EditReservation")}}>close</button>
                                        
                            </span>
                                    
                        </center>
                        <br/>
                                    
                       
                    </div>     
                    
                </Modal>
 
            </div>
        );
    }
    componentDidMount(){
        console.log(">>> Inside ERsvDidMount", this.state)
        
        if(localStorage.getItem('rsvpNwDte')){
            this.setState({searchByDate: new Date(localStorage.getItem('rsvpNwDte'))})
        }
        else{
            this.setState({ searchByDate: ''})
        }

        fetch(`${GetReservationID}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                eventsedit:data
            })
            
        })

        this.myTimer = setInterval(() => {
            fetch(`${GetReservationID}`, {method:'GET'})
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    eventsedit:data
                })
                
            })
        },60000);

        fetch(`${RoomUrl2}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                displayAllRoomNums:data
            })
        })

        fetch(`${userName}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                loginDetails:data
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

export default EditReservation;