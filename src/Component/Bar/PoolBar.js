import React,{Component} from 'react';
import './Bar.css';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Poollogin from '../Poollogin';
import {Modal} from 'react-responsive-modal';
import 'bootstrap/dist/css/bootstrap.min.css';


const restMenugrpUrl = "http://192.168.6.231:3333/drinkCategories";

const menuUrl = "http://192.168.6.231:3333/drinkitems?drinktypes=";
const postRestBill = "http://192.168.6.231:3333/poolbar";
const posttoRest = "http://192.168.6.231:3333/restaurant";
const getRooms ="http://192.168.6.231:3333/checkin?docket=Yes";
const getGuestID = "http://192.168.6.231:3333/checkin?roomNumID=";
const postDocketToRoom = "http://192.168.6.231:3333/bill";
const getPaymentMethods = "http://192.168.6.231:3333/paymentMethods";
const postToTable = "http://192.168.6.231:3333/poolbarTablePost";
const getTable = "http://192.168.6.231:3333/poolbarTable";
const getTableID = "http://192.168.6.231:3333/poolbarTable?tableID=";
const getWaitersTableData = "http://192.168.6.231:3333/poolbarWaitersTable?waitersName=";
const getWaitersTableDatawrtID = "http://192.168.6.231:3333/poolbarWaitersTable?waiterTabID=";
const getwaitersCost = "http://192.168.6.231:3333/poolWaitersCost?TotwaiterTabID=";
const delwaitersCost = "http://192.168.6.231:3333/poolwaitersSD";
const getStoreData = "http://192.168.6.231:3333/getPoolBarStore2";
const postBarSalesQty = "http://192.168.6.231:3333/postPoolBarSalesQty";
const getBarSalesQty = "http://192.168.6.231:3333/getPoolBarSalesQty";
const userName = "http://192.168.6.231:3333/poolUserInfo";
const Postwaiters = "http://192.168.6.231:3333/poolWaiterslist";
const waitersSales = "http://192.168.6.231:3333/postWaitersSales";
const postsplits = "http://192.168.6.231:3333/splitPayments";
const delsplits = "http://192.168.6.231:3333/delsplitpay";
const getSplitpays = "http://192.168.6.231:3333/getSplits";
const DelWaiters = "http://192.168.6.231:3333/delWaiters";
const DelWaitersSales = "http://192.168.6.231:3333/delWaitersSales";
const getWaiters = "http://192.168.6.231:3333/getWaiters";
const getwaitersData = "http://192.168.6.231:3333/poolWaitersData";


const postRestCredit = "http://192.168.6.231:3333/poolCredit";
const getRestCredit = "http://192.168.6.231:3333/poolCreditSales?PCstaff=";
const getHotelAddress = "http://192.168.6.231:3333/hoteladdress";
const getWorkDate = "http://192.168.6.231:3333/getActive";


const menuLink = "http://192.168.6.231:3333/menuitems?mealtypes=";
const RestaurantMenugrpUrl = "http://192.168.6.231:3333/menuCategories";

class PoolBar extends Component {

    constructor(props) {
        super (props);
        console.log(">>>Inside RESConstructor",props)

        this.state = {
            Newmeal:'',
            Newprice:'',
            Newqty:0,
            Newid:'',
            edit:false,
            edit2: false,
            waitersTD: false,
            editreceipt:false,
            compModal:false,
            report:false,
            printStop:0,
            docketFirst:0,
            printBTN:'Print',
            print:0,
            blockTable:0,
            IDfound:[],
           
            menu:'',
            RestMenu:'',
            meal:'',
            mealPrice:'',
            mealQuantity:'',
            mealId:Math.floor(Math.random()*10000),
            guestInhouseID:'',
            selected:[],
            printSelection:[],
            menuID:'',
            menulist:'',
            Restmenulist:'',
            cost:0,
            amountPaid:'',
            roomNumbers:'',
            paymentMethod:'',
            displayPaymentMethods:'',
            displayRoomNums:'',
            transactionDate:'',
            tables:'',
            newTable:'',
            NewtableNum:0,
            group:'',
            loginDetails:'',
            name:localStorage.getItem('userInfo'),
            Blogin:'',
            login:'',
            shiftcolor:'',
            shift:localStorage.getItem('shift'),

            waitersFName: '',
            waiterLName: '',
            LoadWaiters:'',
            findWaiter: '',
            WaitersData:'',
            waitersCost:'',
            waiterTableData: '',
            totalbicost: 0,
            
            

            DrinkstoreData:[],
            DrinkSalesQtyData:[],
            DrinkStore:0,
            DrinkSalesQty:0,
            stockBal:0,

        
            
            
            DrinkSalesQtyReportData:'',
            useReportName:'',
            useReportShift:'',
            useReportDate:'',
            totalSales:0,
            Stockbtn:'Add',

            creditSales:'',
            TotalCredit:0,
            creditPaid:0,
            payNwMeth:'',
            TotalCreditPaid:0,
            splitBal: [],

            Hotelname:'',
            Hoteladdress:'',
            Hotelphone:'',

            pass:'',
            pword:false,
            pword2:false,

            waiters: false,
            selectWaiter:false,
            selectWaiterNew: false,
            
            split: false,

            showRestaurant: 'hidden',
            showPoolBar: 'visible',
            showPoolPos: 'visible',
            showRestaurantPos: 'hidden',

            showSalesTable: 'visible',
            showWaitersTable: 'hidden',
            toggle: 'hidden',
            posting: 0,

            Resteditreceipt: false,
            editsplitreceipt: false,

            Resteditreceipt2: false,
            RestRmcompModal: false
            

            
            
        }
        
    }

    onOpenPword(){
        if(this.state.paymentMethod==="Credit"){
            this.setState({
                pword: true
            })
            
        }
        else{
            this.setState({
                pword: false
            });
            this.onOpenModalreceipt();
            this.postQty()
        }

    }

    showRest(){
        
        this.setState({
            showRestaurant: 'visible',
            showPoolBar: 'hidden',
            showPoolPos: 'hidden',
            showRestaurantPos: 'visible'
           
        })
        
        
    }

    showPool(){
        
        this.setState({
            showRestaurant: 'hidden',
            showPoolBar: 'visible',
            showPoolPos: 'visible',
            showRestaurantPos: 'hidden'
           
        })
        
        
    }

    showAllTab(){
        
        this.setState({
            showSalesTable: 'visible',
            showWaitersTable: 'hidden',
            toggle: 'hidden',
            posting: 0
            
           
        })
        
        
    }

    showAllTab2(){
        window.location.reload();
        this.setState({
            waitersCost: 0,
            posting: 0
        })
    
    }

    showWaitrsTab(){
        
        this.setState({
            showSalesTable: 'hidden',
            showWaitersTable: 'visible',
            toggle: 'visible',
            posting: 1
            
           
        })
        
        
    }

    onClosePword(){
        this.setState({
            pword: false
        })
        
    }

    AllowRefund(){
        if(this.state.pass==='6849'){
            this.onOpenModalreceipt();
            this.postQty();
            this.onClosePword()

        }
        else{
            alert('Access Denied')
        }
    }

    onOpenModaltoprint(){
        this.setState({
            edit: true
        })
        
        
    }

    onOpenModaltoprint2(){
        this.setState({
            edit2: true
        })
        
        
    }

    onOpenModalsplitreceipt(){
        this.setState({editsplitreceipt: true})
    }

    onCloseModalsplitreceipt(){
        this.setState({editsplitreceipt: false})
    }

    

    onCloseModaltoprint2(){
        this.setState({
            edit2: false
        })
        
        
    }

    
    onOpenCompModal(){
        this.setState({
            compModal: true
        })
        
        
    }

    onCloseModalCredit(){
        this.setState({
            credit: false,
            creditPaid:0
        })
        
    }

    onCloseCompModal(){
        this.setState({
            compModal: false
        })
        
    }

    onOpenCompRestRoomModal(){
        this.setState({
            RestRmcompModal: true
        })
        
        
    }

    onCloseCompRestRoomModal(){
        this.setState({
            RestRmcompModal: false
        })
        
        
    }

    onCloseRestModalreceipt(){
        this.setState({
            Resteditreceipt: false
        })
        
    }   
    
    onOpenRestModalreceipt(){
        this.setState({
            Resteditreceipt: true
        })
        
        
    }

    onOpenRestModalreceipt2(){
        this.setState({
            Resteditreceipt2: true
        })
        
        
    }

    onCloseRestModalreceipt2(){
        this.setState({
            Resteditreceipt2: false
        })
        
    } 


    onCloseModaltoprint(){
        this.setState({
            edit: false
        })
        
    }

    onOpenModalreceipt(){
        this.setState({
            editreceipt: true
        })
        
        
    }

    onOpenSplit(){
        this.setState({
            split: true
        })
    }


    onCloseSplit(){

        this.setState({selected:[]});
        this.setState({cost:0})
        this.setState({amountPaid:''})
        this.setState({displayRoomNums:''})
        this.setState({roomNumbers:''})
        this.setState({paymentMethod:''})
        this.setState({displayPaymentMethods:''})
        this.setState({
            group:'',
            NewtableNum:0,
            shift:'',
            Newmeal:'',
            Newprice:'',
            Newqty:0,
            Newid:'',
            DrinkstoreData:[],
            DrinkSalesQtyData:[]
        })
        sessionStorage.removeItem('stockBal');
        localStorage.removeItem('delcntrl');
        localStorage.setItem('btnCntrl',true);
        sessionStorage.removeItem('tableNumber3');

        fetch(`${getStoreData}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkstoreData:data
            })
        })

        fetch(`${getBarSalesQty}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkSalesQtyData:data
            })
        })

        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({tables:data})
        })
        
        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({tables:data})
        })
        
        this.setState({
            split: false
        })

        fetch(`${delsplits}`, {method:'delete'});
        
        
    }

    onCloseModalreceipt(){
        this.setState({
            editreceipt: false
        })
        
    }

    onOpenModalreport(){
        this.setState({
            report: true
        })
        
        
    }

    onCloseModalreport(){
        this.setState({
            report: false
        })
        
    }

    handleReport(){

        var todayDate = moment(new Date()).format('MMM DD YYYY');
        var username = localStorage.getItem('userInfo');
        var findQty = `${getBarSalesQty}?useDate=${todayDate}&&useshift=${this.state.shift}&&userstaff=${username}`
        
        fetch(`${findQty}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkSalesQtyReportData:data
            })
            
        })
        this.myTimer = setTimeout(() => {
            if(this.state.DrinkSalesQtyReportData.length>0){
                var useData = this.state.DrinkSalesQtyReportData
                var findUser = useData.find(element=>element.user===username)
                var useDt = [];
                useDt.push(findUser);
                this.setState({useReportName:useDt.map(item=>item.user)})
                this.setState({useReportShift:useDt.map(item=>item.shift)})
                this.setState({useReportDate:useDt.map(item=>item.tranDate)})
                
                var TotSal = useData.reduce((total, item)=>{
                    return total + parseInt (item.productPrice * item.Quantity)
                }, 0);
                this.setState({totalSales:TotSal});
    
                this.onOpenModalreport()
            }
            else{
    
                alert('No Sales was posted by '+username)
    
            }
        },1000)
        
        
    }


    handleStock(){
        if(this.state.DrinkstoreData.length>0){
            var stockItem = sessionStorage.getItem('meal');
           
            //check available stock
            const stockData=this.state.DrinkstoreData;
            var totalStock = stockData.filter(stock => stock.productName.includes(stockItem)).reduce((total, item)=>{
                return total + parseInt(item.piecesOut)
            }, 0);
            this.setState({DrinkStore:totalStock})

            //check quantity sold
            const qtyData=this.state.DrinkSalesQtyData;
            var totalQty = qtyData.filter(qty => qty.productName.includes(stockItem)).reduce((total, item)=>{
                return total + parseInt(item.Quantity)
            }, 0);
            this.setState({DrinkSalesQty:totalQty})
            
            //show stock balance
            this.myTimer = setTimeout(() => {

                var Total = 0;
                var ST = Total + this.state.DrinkStore-this.state.DrinkSalesQty;
                this.setState({stockBal:ST})
                if(ST<0||ST<-1){
                    this.setState({stockBal:0})
                };

                if(this.state.stockBal===0){
                    this.setState({Stockbtn:'Finished'})
                }
                else{this.setState({Stockbtn:'Add'})}

                
            },1000);
                
        }
       
        
        

    }

    
    handleCost=(selected)=>{
        if(this.state.selected!==null){
           const totalSale = selected.reduce((total, item) => {
               return total + item.mealPrice * item.qty
           }, 0);
           this.setState({cost:totalSale})
        }
        if(this.state.cost!==null){
            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
            localStorage.removeItem('btnCntrl');
            localStorage.removeItem('delcntrl')
        }
        
        
    }  
   
    addqty = () => {
        const del = this.state.selected.map((item) => parseInt(item.qty + 1));
        this.setState({selected:del})
       
    }
        
    removeAll = (id) => {
        const del = this.state.selected.filter(item => item.id === id);
        this.setState({selected:del})
        this.setState({cost:0})
        this.setState({roomNumbers:''})
        this.setState({amountPaid:''})
        this.setState({displayRoomNums:''})
        this.setState({paymentMethod:''})
        this.setState({displayPaymentMethods:''})
        this.setState({
            displayPaymentMethods:'',
            DrinkStore:0,
            DrinkSalesQty:0,
            stockBal:0
        })
        
       
    }

    ComputeAmtPaid(){

        fetch(`${getSplitpays}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {

            let allSplitPmnts = data.map(item => item).reduce((totals, item) =>{
                return  totals + parseFloat(item.Amounts)
            }, 0);
            this.setState({
                splitBal:allSplitPmnts,
                amountPaid: '',
            })

        })


        // let splitpayments = [];
        // let totalsplits = {};
        
        
        // let pd = this.state.amountPaid;
        // totalsplits.payments = pd;
        
        // splitpayments.push(totalsplits);
        

        

       
    }

    async addToTable() {

        
        try {
            

            var tableID = sessionStorage.getItem('tableNumber3');

            var orderItems = this.state.selected;
            var data = {
                selected:orderItems.map(item => item),
                billCost:this.state.cost,
                tableNum:sessionStorage.getItem('tableNumber3'),
                user:localStorage.getItem('userInfo')
            }
           
           
            var orderList = this.state.printSelection;
            
            const thisSales = orderList.reduce((total, item) => {
                return total + item.mealPrice * item.qty
            }, 0);
            
            
            var Orderdata = {
                _id: Math.floor(Math.random()*10000),
                waiterselection:orderList.map(item => item),
                billCost:thisSales,
                tableNum:sessionStorage.getItem('tableNumber3'),
                waiter:this.state.findWaiter
            }
           
            
            let waiterresult = await fetch(`${waitersSales}`, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    Orderdata
                    
                )
                
            });
            console.log('waiterresult>  ' + waiterresult)
            this.onOpenModaltoprint();
            
            

            let result = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result>  ' + result)
            this.setState({selected:[]})
            localStorage.setItem('btnCntrl',true);
            this.setState({cost:0})
            this.setState({roomNumbers:''})
            this.setState({displayRoomNums:''})
            this.setState({displayPaymentMethods:''})
            this.setState({paymentMethod:''})
            this.setState({printStop:0})
            localStorage.removeItem('delcntrl');
            sessionStorage.removeItem('tableNumber3')
            

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            });

            this.handleGetWaitListClose();
            this.getWaitersC();

            
                              
        } catch(e) {
            console.log(e)
        }

    }
    

    handleCredit(){
        var userCredit = localStorage.getItem('userInfo');
        fetch(`${getRestCredit}${userCredit}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                creditSales:data
            })
            data.map((item)=>{
                var allCredit = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.creditAmount)
                }, 0);

                this.setState({TotalCredit:allCredit,});
                var allCreditPaid = data.map(item => item).reduce((totals, item) =>{
                    return totals + parseInt(item.creditPaid)
                }, 0);
                this.setState({TotalCreditPaid:allCreditPaid});
                return 'ok'
            })
        })

        this.myTimer = setTimeout(() => {

            this.setState({
                credit: true
            })
    
        },1000);
        
        
    }

    handleGetWaitListOpen(){

        this.getWaitersNow();

        this.myTimer = setTimeout(() => {
            this.setState({selectWaiter: true})

        },1000)

    }

    handleGetWaitListClose(){
        this.setState({selectWaiter: false})

    }

    handleGetWaitListOpenNew(){
        if(this.state.cost === 0){
            alert ("If you click table Number again without an order, I will slap you!")
        }

        else{
            this.getWaitersNow();

            this.myTimer = setTimeout(() => {
                this.setState({selectWaiterNew: true})
                
            },1000)

        }
        
        

    }

    handleGetWaitListCloseNew(){
        this.setState({selectWaiterNew: false})

    }

    async NewTable() {
          
        try {
            
            var NewtableID = sessionStorage.getItem('tableNumber3');

            var orderItems = this.state.selected;
            var data = {
                selected:orderItems.map(item => item),
                billCost:this.state.cost,
                tableNum:NewtableID
            }

            var orderList = this.state.printSelection;
            var Orderdata = {
                _id: Math.floor(Math.random()*10000),
                waiterselection:orderList.map(item => item),
                billCost:this.state.cost,
                tableNum:sessionStorage.getItem('tableNumber3'),
                waiter:this.state.findWaiter
            }
           
            
            let waiterresult2 = await fetch(`${waitersSales}`, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    Orderdata
                    
                )
                
            });
            console.log('waiterresult2>  ' + waiterresult2)
            
            
           
            if(this.state.cost===0){
                alert ("If you click table Number again without an order, I will slap you!")
                sessionStorage.removeItem('tableNumber')
            }
            else{
                let result = await fetch(`${postToTable}/${NewtableID}`, {
                    method: 'put',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        data
                        
                    )
                    
                });
                console.log('result>  ' + result)
                this.setState({selected:[]})
                localStorage.setItem('btnCntrl',true);
                this.setState({cost:0})
                this.setState({roomNumbers:''})
                this.setState({displayRoomNums:''})
                this.setState({displayPaymentMethods:''})
                this.setState({paymentMethod:''})
                localStorage.removeItem('delcntrl');
                this.setState({newTable:''})

                
                this.handleGetWaitListCloseNew();
            
                
    
                fetch(`${getTable}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({tables:data})
                });

                this.onOpenModaltoprint();


            }
            

            
                              
        } catch(e) {
            console.log(e)
        }

    }

    async getTableP() {
          
        try {
            
            var tableID = sessionStorage.getItem('tableNumber3');
           
            fetch(`${getTableID}${tableID}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            data.map((item)=>{
            this.setState({
                selected:item.selected,
                cost:item.billCost,
                NewtableNum:1
                        
            })
            return 'ok'
                   
            })
                localStorage.removeItem('btnCntrl')
            })

            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })
        
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
            localStorage.setItem('delcntrl',true)
            this.setState({printStop:1})
           
        } catch(e) {
            console.log(e)
        }

    }

    getWSC(){
        this.setState({waitersCost: 0});
        let getWFN = sessionStorage.getItem('waitersTabNum');
        

        fetch(`${getwaitersCost}${getWFN}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            let totalbicost = data.map(item => item).reduce((totals, item) =>{
                return  totals + parseFloat(item.billCost)
            }, 0);
        
            this.setState({
                
                waitersCost: totalbicost
                
            })

            data.map((item) =>{
                sessionStorage.setItem('getWSID', item._id)

                return 'ok'
            })

            

            
        
        })
    }

    async getTablewrtW() {
          
        try {
            
            var getTWRTWNm = sessionStorage.getItem('wtwrtid');
                        
            fetch(`${getWaitersTableDatawrtID}${getTWRTWNm}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
            data.map((item)=>{
            this.setState({
                selected:item.waiterselection,
                cost:item.billCost
                
                        
            })
            return 'ok'
                
            })
                localStorage.removeItem('btnCntrl')
            })

            fetch(`${getRooms}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayRoomNums:data
                })
            })
        
            fetch(`${getPaymentMethods}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    displayPaymentMethods:data
                })
            })
            localStorage.setItem('delcntrl',true)
            this.setState({printStop:1})


            
           
        } catch(e) {
            console.log(e)
        }

    }

    postQty(){
       
        try {
            
            this.state.selected.map((item)=>{
                var prodName = item.meal;
                var prodPrice = item.mealPrice;
                var Qty = item.qty;
                var ID = item.tranID;
                
                var salesQty = {
                    id:ID,
                    productName:prodName,
                    productPrice:prodPrice,
                    Quantity:parseInt(Qty),
                    user: localStorage.getItem('userInfo'),
                    tranDate:moment(new Date()).format('MMM DD YYYY'),
                    shift:localStorage.getItem('shift'),
                                
                }
                let result = fetch(`${postBarSalesQty}`, {
                    method: 'post',
        
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
        
                    body: JSON.stringify(
                        salesQty
                    )
                        
                });
                console.log('result>  ' + result)
                this.setState({
                    Newmeal:'',
                    Newprice:'',
                    Newqty:0,
                    Newid:'',
                    DrinkstoreData:[],
                    DrinkSalesQtyData:[]
                })

                this.myTimer = setTimeout(() => {
                    fetch(`${getStoreData}`, {method:'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            DrinkstoreData:data
                        })
                    })

                    fetch(`${getBarSalesQty}`, {method:'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            DrinkSalesQtyData:data
                        })
                    })
                
                },1000)
                
                return 'ok'
            })    
        

            
        }catch(e) {
            console.log(e)
        }
    }


    buttonClick (){
        fetch(`${menuUrl}${this.state.menuID}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                menulist:data
            })
        })

    }

    RestbuttonClick (){
        fetch(`${menuLink}${this.state.menuID}`, {method:'GET'})
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                Restmenulist:data
            })
        })

    }

    sendtoprinter(){
        
        window.print();
                
       
    }

    sendtoprinter2(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({
                printSelection:[]
                
            });
            this.setState({printBTN:'Close'});
            this.getWaitersC();
        }
        else if(this.state.printBTN==='Close'){
            this.setState({edit: false})      
            this.setState({printBTN:'Print'})
            this.setState({
                print:0,
                printStop:0,
                // DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0,
                blockTable:0

            }) 
            
            
            
        }
       
    }

    sendtoprinterNew(){
        if(this.state.printBTN==='Print'){
            window.print();
            this.setState({
                
                selected: []
            });
            this.setState({printBTN:'Close'});
            this.getWaitersC();
        }
        else if(this.state.printBTN==='Close'){
            this.setState({edit2: false})      
            this.setState({printBTN:'Print'})
            this.setState({
                print:0,
                printStop:0,
                // DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0,
                blockTable:0

            }) 
            
            
            
        }
       
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    
    }

    handleChangeComp = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        

        // this.ComputeAmtPaid();
    
    }

    handleChange3 = (event) => {
        if(this.state.Newmeal!==''||this.state.Newprice!==''||this.state.Newid!==''){
            this.setState({
                [event.target.name]:event.target.value
            })
        }
        
    }


    handleChange2 = (event) => {
        console.log('inside handle', this.props)
        this.setState({
           [event.target.name]:event.target.value
        })
        fetch(`${getGuestID}${event.target.value}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item) => {
                this.setState({
                    guestInhouseID:item.refID,
                    group:item.group
                })
                return 'ok'
            })
        })
    
    }
    

    async handleSubmit() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            let wtabdata = sessionStorage.getItem('wtwrtid')

            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)
                
            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }


            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
        
            }

            if(this.state.paymentMethod==="Complimentary"){
                var complimentarySales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    amountPaid:`${this.state.amountPaid}`,
                    CompDebit:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }

                let result2 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        complimentarySales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

                
            }

            if(this.state.paymentMethod==="Credit"){
                var CreditSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    creditAmount:`${this.state.amountPaid}`,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Credit",
                    department: "PoolBar Credit",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    creditPaid:`${this.state.creditPaid}`
                   
                }

                let result2 = await fetch(postRestCredit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CreditSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }
            
            let result12 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            let wscdata = await fetch(`${delwaitersCost}/${wtabdata}`, {
                method: 'delete',

                                
            });
            console.log('wscdata>  ' + wscdata)

            this.getWT();

            alert("Sales Posted")
            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({
                group:'',
                NewtableNum:0,
                shift:'',
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                DrinkstoreData:[],
                DrinkSalesQtyData:[]
            })
            sessionStorage.removeItem('stockBal');
            localStorage.removeItem('delcntrl');
            localStorage.setItem('btnCntrl',true);
            sessionStorage.removeItem('tableNumber');

            fetch(`${getStoreData}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    DrinkstoreData:data
                })
            })

            fetch(`${getBarSalesQty}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    DrinkSalesQtyData:data
                })
            })

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
            
            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRestSubmit() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            var split = {
                Amounts: this.state.amountPaid
            }

            let splitPs = await fetch(postsplits, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    split
                   
                )
                
            });
            console.log('splitPs>  ' + splitPs)

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }
            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
            }

            if(this.state.paymentMethod==="Complimentary"){
                var complimentarySales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    amountPaid:`${this.state.amountPaid}`,
                    CompDebit:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }

                let result2 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        complimentarySales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }

            if(this.state.paymentMethod==="Credit"){
                var CreditSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    creditAmount:`${this.state.amountPaid}`,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Credit",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    creditPaid:`${this.state.creditPaid}`
                   
                }

                let result2 = await fetch(postRestCredit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CreditSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }
            
            let result12 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            this.ComputeAmtPaid();

            alert("Sales Posted")
            

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRestSubmit2() {
          
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            let wtabdata = sessionStorage.getItem('wtwrtid')
            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            var split = {
                Amounts: this.state.amountPaid
            }

            let splitPs = await fetch(postsplits, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    split
                   
                )
                
            });
            console.log('splitPs>  ' + splitPs)

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }
            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
            }

            if(this.state.paymentMethod==="Complimentary"){
                var complimentarySales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    amountPaid:`${this.state.amountPaid}`,
                    CompDebit:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Sales",
                    department: "Restaurant Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }

                let result2 = await fetch(posttoRest, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        complimentarySales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }

            if(this.state.paymentMethod==="Credit"){
                var CreditSales = {
                    docketNum:'Rest'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    creditAmount:`${this.state.amountPaid}`,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "Restaurant Credit",
                    department: "Restaurant Credit",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    creditPaid:`${this.state.creditPaid}`
                   
                }

                let result2 = await fetch(postRestCredit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CreditSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }
            
            let result12 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            

            alert("Sales Posted")

            let wscdata = await fetch(`${delwaitersCost}/${wtabdata}`, {
                method: 'delete',

                                
            });
            console.log('wscdata>  ' + wscdata)

            this.getWT();

            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({group:''})
            this.setState({
                shift:'',
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                DrinkstoreData:[],
                DrinkSalesQtyData:[],
                NewtableNum:0
            })
            localStorage.removeItem('delcntrl');
            sessionStorage.removeItem('tableNumber3')
            

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleSplitSubmit() {
          
        
        try {


            var tableID = sessionStorage.getItem('tableNumber3');

            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }

            var split = {
                Amounts: this.state.amountPaid
            }

            let splitPs = await fetch(postsplits, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    split
                   
                )
                
            });
            console.log('splitPs>  ' + splitPs)

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.amountPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

                
                
            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }


            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.amountPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
        
            }

            if(this.state.paymentMethod==="Complimentary"){
                var complimentarySales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    amountPaid:`${this.state.amountPaid}`,
                    CompDebit:`${this.state.cost}`,
                    POSAmount:0,
                    CashAmount:0,
                    TransferAmount:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Sales",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }

                let result2 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        complimentarySales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

                
            }

            if(this.state.paymentMethod==="Credit"){
                var CreditSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    creditAmount:`${this.state.amountPaid}`,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Credit",
                    department: "PoolBar Credit",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift'),
                    creditPaid:`${this.state.creditPaid}`
                   
                }

                let result2 = await fetch(postRestCredit, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CreditSales
                       
                    )
                    
                });
                console.log('result2>  ' + result2)

            }
            
            let result12 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result12>  ' + result12)

            this.ComputeAmtPaid();

            alert("Sales Posted")

            
            
           
                   
        } catch(e) {
            console.log(e)
        }

    }

    handleWaitersOpen(){
        this.setState({waiters: true});
    }

    handleWaitersClose(){
        this.setState({waiters: false});
    }


    getWaitersNow(){
        fetch(`${getWaiters}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
           
        this.setState({
            LoadWaiters:data,
            
        })
        return 'ok'
            
        })
    }

    getWaitersData(){
        fetch(`${getwaitersData}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
           
            this.setState({
                WaitersData:data,
                
            })
            return 'ok'
            
        })
    }

    getWaitersC(){
        fetch(`${getwaitersCost}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            let totalbicost = data.map(item => item).reduce((totals, item) =>{
                return  totals + parseFloat(item.billCost)
            }, 0);
        
            this.setState({
                
                waitersCost: totalbicost
                
            })
            return 'ok'
            
        })
    }


    async handleWaiters() {
          
        try {
            
            
            var Waiters = {
                WaiterID:'Waiters'+Math.floor(Math.random()*1000),
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                FirstName:`${this.state.waitersFName}`,
                LastName:`${this.state.waiterLName}`,
                
            }
            let resultWaiter = await fetch(Postwaiters, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    Waiters
                    
                )
                
            });
            console.log('resultWaiter>  ' + resultWaiter)
            
            alert(`${this.state.waitersFName} was registered successfully`)
            
            this.setState({
                waitersFName:'',
                waiterLName:'',
                waitersID:'',
                waiters: false
                
            })

            this.myTimer = setTimeout(() => {
                this.getWaitersNow();
                this.getWaitersData();
    
            },1000)


                   
        } catch(e) {
            console.log(e)
        }

    }

    async handleRemoveWaiters() {
          
        try {
            
            
            let resultdelWaiter = await fetch(DelWaiters, {
                method: 'delete',

            });

            
            console.log('resultdelWaiter>  ' + resultdelWaiter)

            let resultdelWaiterSales = await fetch(DelWaitersSales, {
                method: 'delete',

            });

            
            console.log('resultdelWaiterSales>  ' + resultdelWaiterSales)
            
            this.getWaitersC();
            this.getWT();
            
            alert("Waiters List was  deleted successfully")

            this.setState({LoadWaiters: ''})
            window.location.reload();
            
        
                   
        } catch(e) {
            console.log(e)
        }

    }

    async postCredit() {
          
        
        try {
            
            var CreditSales = {
                docketNum:'Bar'+Math.floor(Math.random()*10000),
                date:moment(this.state.transactionDate).format('MMM DD YYYY'),
                cost:0,
                creditAmount:0,
                paymentMethod:`${this.state.paymentMethod}`,
                description: "PoolBar Credit",
                department: "PoolBar Credit",
                docketDetails: this.state.selected,
                group:`${this.state.group}`,
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift'),
                creditPaid:`${this.state.creditPaid}`
                
            }
            let creditPay = await fetch(postRestCredit, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    CreditSales
                    
                )
                
            });
            console.log('creditPay>  ' + creditPay)

            if(this.state.paymentMethod==="POS"){
                var POSSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    POSAmount:`${this.state.creditPaid}`,
                    CashAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Credit",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result5 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        POSSales
                       
                    )
                    
                });
                console.log('result5>  ' + result5)

            }
            if(this.state.paymentMethod==="Cash"){
                var CashSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    CashAmount:`${this.state.creditPaid}`,
                    POSAmount:0,
                    TransferAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Credit",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result4 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        CashSales
                       
                    )
                    
                });
                console.log('result4>  ' + result4)
                
            }
            if(this.state.paymentMethod==="Transfer"){
                var transferSales = {
                    docketNum:'Bar'+Math.floor(Math.random()*10000),
                    date: moment(this.state.transactionDate).format('MMM DD YYYY'),
                    cost:`${this.state.cost}`,
                    TransferAmount:`${this.state.creditPaid}`,
                    POSAmount:0,
                    CashAmount:0,
                    CompDebit:0,
                    roomDebit:0,
                    paymentMethod:`${this.state.paymentMethod}`,
                    description: "PoolBar Credit",
                    department: "PoolBar Sales",
                    docketDetails: this.state.selected,
                    group:`${this.state.group}`,
                    user: localStorage.getItem('userInfo'),
                    shift:localStorage.getItem('shift')
                   
                }
                let result3 = await fetch(postRestBill, {
                    method: 'post',
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
    
                    body: JSON.stringify(
                        transferSales
                       
                    )
                    
                });
                console.log('result3>  ' + result3)
                
            }

            alert("Credit Posted")
            this.setState({
                creditSales:'',
                TotalCredit:0,
                creditPaid:0,
                TotalCreditPaid:0
            })
                               
        } catch(e) {
            console.log(e)
        }

    }

    async handleRoomSubmit2() {
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            let wtabdata = sessionStorage.getItem('wtwrtid')

            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }
            var restaurantSales = {
                _id:Math.floor(Math.random()*10000),
                docketNum:'Bar'+Math.floor(Math.random()*10000),
                refID:`${this.state.guestInhouseID}`,
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:`${this.state.cost}`,
                amountPaid:`${this.state.amountPaid}`,
                roomDebit:`${this.state.cost}`,
                POSAmount:0,
                CashAmount:0,
                TransferAmount:0,
                CompDebit:0,
                paymentMethod:`${this.state.paymentMethod}`,
                roomNumbers:`${this.state.roomNumbers}`,
                description:"Restaurant Docket",
                department: "Restaurant Sales",
                docketDetails: this.state.selected,
                group:`${this.state.group}`,
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
               
            }
            let result = await fetch(postDocketToRoom, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result>  ' + result)

            let result2 = await fetch(posttoRest, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result2>  ' + result2)

            let result14 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result14>  ' + result14)

            let wscdata = await fetch(`${delwaitersCost}/${wtabdata}`, {
                method: 'delete',

                                
            });
            console.log('wscdata>  ' + wscdata)

            this.getWT();


            alert("Docket Posted to Room " +this.state.roomNumbers)
            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({group:''})
            this.setState({
                NewtableNum:0,
                shift:'',
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:''
                
            })
            sessionStorage.removeItem('stockBal');
            localStorage.removeItem('delcntrl');
            localStorage.setItem('btnCntrl',true);
            sessionStorage.removeItem('tableNumber');

                       
            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
                   
        } catch(e) {
            console.log(e)
        }

    }


    

    async handleRoomSubmit() {
        
        try {
            var tableID = sessionStorage.getItem('tableNumber3');
            let wtabdata = sessionStorage.getItem('wtwrtid')

            var data = {
                selected:[],
                billCost:"",
                tableNum:sessionStorage.getItem('tableNumber3')
            }
            var restaurantSales = {
                _id:Math.floor(Math.random()*10000),
                docketNum:'Bar'+Math.floor(Math.random()*10000),
                refID:`${this.state.guestInhouseID}`,
                date: moment(`${this.state.transactionDate}`).format('MMM DD YYYY'),
                cost:`${this.state.cost}`,
                amountPaid:`${this.state.amountPaid}`,
                roomDebit:`${this.state.cost}`,
                POSAmount:0,
                CashAmount:0,
                TransferAmount:0,
                CompDebit:0,
                paymentMethod:`${this.state.paymentMethod}`,
                roomNumbers:`${this.state.roomNumbers}`,
                description:"PoolBar Docket",
                department: "PoolBar Sales",
                docketDetails: this.state.selected,
                group:`${this.state.group}`,
                user: localStorage.getItem('userInfo'),
                shift:localStorage.getItem('shift')
               
            }
            let result = await fetch(postDocketToRoom, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result>  ' + result)

            let result2 = await fetch(postRestBill, {
                method: 'post',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    restaurantSales
                   
                )
                
            });
            console.log('result2>  ' + result2)

            let result14 = await fetch(`${postToTable}/${tableID}`, {
                method: 'put',

                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },

                body: JSON.stringify(
                    data
                    
                )
                
            });
            console.log('result14>  ' + result14)

            let wscdata = await fetch(`${delwaitersCost}/${wtabdata}`, {
                method: 'delete',

                                
            });
            console.log('wscdata>  ' + wscdata)

            this.getWT();


            alert("Docket Posted to Room " +this.state.roomNumbers)
            this.setState({selected:[]});
            this.setState({cost:0})
            this.setState({amountPaid:''})
            this.setState({displayRoomNums:''})
            this.setState({roomNumbers:''})
            this.setState({paymentMethod:''})
            this.setState({displayPaymentMethods:''})
            this.setState({group:''})
            this.setState({
                NewtableNum:0,
                shift:'',
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                DrinkstoreData:[],
                DrinkSalesQtyData:[]
            })
            sessionStorage.removeItem('stockBal');
            localStorage.removeItem('delcntrl');
            localStorage.setItem('btnCntrl',true);
            sessionStorage.removeItem('tableNumber');

            fetch(`${getStoreData}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    DrinkstoreData:data
                })
            })

           
            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            })
                   
        } catch(e) {
            console.log(e)
        }

    }

    logout(){
        localStorage.removeItem('userInfo');
        this.setState({
            login:true
        })
        localStorage.removeItem('shift')
    }


    renderTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost===""){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-success cartBtn3 alignroomsgreen2" disabled = {this.state.NewtableNum===1} onClick={() => {sessionStorage.setItem('tableNumber3', item.tableNum);this.handleGetWaitListOpenNew();this.setState({docketFirst:0})}}>
                                <p className="texted">{item.tableNum}</p>
                            </button>
                        </div>
                    )
                }
                else{
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('tableNumber3', item.tableNum);this.getTableP();this.setState({print:1})}}>
                                <p className="texted">{item.tableNum}</p>
                            </button>
                        </div>
                    )
                }
               
            })
        }
    }


    renderWaitersTables(data){
        if(data) {
            data.sort((a, b) => a.tableNum - b.tableNum);
           
            return data.map((item) => {
                if(item.billCost!=="" || item.billCost !==0){
                    return(
                        <div key={item._id}>
                            <button className="btn btn-warning cartBtn3 alignroomsgreen2" onClick={() => {sessionStorage.setItem('wtwrtid', item._id); this.getTablewrtW(); this.setState({print:1})}}>
                                <p className="texted">{item.tableNum}</p>
                            </button>
                        </div>
                    )
                }
                else{
                    return null
                }
               
            })
        }
    }
    

    renderPayMeth(data){
        if(data) {
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.method}>
                            {item.method}
                        </option>
                    </>
                )
            })
        }
    }

    renderRooms(data){
        if(data) {
           data.sort((a, b) => a.roomNumbers - b.roomNumbers);
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.roomNumbers}>
                            {item.roomNumbers} - {item.fname} {item.lname}
                        </option>
                    </>
                )
            })
        }
    }

    

    renderWaitersList(data){
        if(data) {
        //    data.sort((a, b) => a.waitersFName - b.waitersFName);
            return data.map((item, index) => {
                return(
                    <>
                        <option key={index} value={item.FirstName}>
                            {item.FirstName} {item.LastName}
                        </option>
                    </>
                )
            })
        }
    }

    addMeal(){
        var menuselect=this.state.menulist;
        menuselect.map((item)=>{
            this.setState({
                Newmeal:item.mealName,
                Newprice:item.mealPrice,
                Newqty:parseInt(item.mealQt),
                Newid:item._id

            })
            return 'ok'
        })
        
    }

    RestaurantaddMeal(){
        var restmenuselect=this.state.Restmenulist;
        restmenuselect.map((item)=>{
            this.setState({
                Newmeal:item.mealName,
                Newprice:item.mealPrice,
                Newqty:parseInt(item.mealQt),
                Newid:item._id

            })
            return 'ok'
        })
        
    }

    increament(){
        if(this.state.Newqty!==0){
            this.setState({
                Newqty:this.state.Newqty +1
            })
        }
       
    }

    decreament(){
        if(this.state.Newqty!==0){
            this.setState({
                Newqty:this.state.Newqty -1
            })
        }
    }

    pushorder(){

        this.pushToPrinter();

        var selected = this.state.selected;
        var selectedMeals = {};

        if(this.state.selected.length>0){
            this.setState({blockTable:1});
    
            selectedMeals.id=this.state.Newid;
            selectedMeals.meal=this.state.Newmeal;
            selectedMeals.mealPrice=this.state.Newprice;
            selectedMeals.qty=this.state.Newqty;
            selectedMeals.tranID=Math.floor(Math.random()*10000)
            
            selected.push(selectedMeals);
                      
            this.setState({
                selected,
                printStop:0,
                DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0,
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:''
            })
                
           
        }
        else if(this.state.selected.length===0){
            this.setState({blockTable:0});

            selectedMeals.id=this.state.Newid;
            selectedMeals.meal=this.state.Newmeal;
            selectedMeals.mealPrice=this.state.Newprice;
            selectedMeals.qty=this.state.Newqty;
            selectedMeals.tranID=Math.floor(Math.random()*10000)
            
            selected.push(selectedMeals);
                      
            this.setState({
                selected,
                Newmeal:'',
                Newprice:'',
                Newqty:0,
                Newid:'',
                printStop:0,
                DrinkStore:0,
                DrinkSalesQty:0,
                stockBal:0
            })
        }

        

        this.myTimer = setTimeout(() => {
            if(this.state.selected.length>0){
                const totalSale = selected.reduce((total, item) => {
                    return total + item.mealPrice * item.qty
                }, 0);
                this.setState({
                    cost:totalSale,
                    
                })
            }

            if(this.state.cost!==0){
                fetch(`${getRooms}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        displayRoomNums:data
                    })
                })
                fetch(`${getPaymentMethods}`, {method:'GET'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        displayPaymentMethods:data
                    })
                })
                // localStorage.removeItem('btnCntrl');
                localStorage.removeItem('delcntrl')
            }
            
        },1000);

 
    }


    pushToPrinter(){
        var printOut = this.state.printSelection;
        var printMeals = {};

        printMeals.id=this.state.Newid;
        printMeals.meal=this.state.Newmeal;
        printMeals.mealPrice=this.state.Newprice;
        printMeals.qty=this.state.Newqty;
        printMeals.tranID=Math.floor(Math.random()*10000)
        
        printOut.push(printMeals);
                    
    }
    

     
    renderMenu(data){
        if (data){
            
            return data.map((item) =>{
                
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'orangered'}} key={item.mealTypeID}>
                                    <button className="btn btn-orangered buttnheightbtn" onMouseOver={()=>sessionStorage.setItem('meal',item.mealName)} onClick={ () =>{this.setState({Newmeal:item.mealName,Newprice:item.mealPrice,Newqty:parseInt(item.mealQt),Newid:item._id,tranID2:Math.floor(Math.random()*10000)});this.handleStock()}}>
                                            
                                    <p className="card-title formatnew2">{item.mealName}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                    </>
                )
            })
        }
    }

    renderRestaurant(data){
        if (data){
            
            return data.map((item) =>{
                
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'orangered'}} key={item.mealTypeID}>
                                    <button className="btn btn-orangered buttnheightbtn" onMouseOver={()=>sessionStorage.setItem('meal',item.mealName)} onClick={ () =>{this.setState({Newmeal:item.mealName,Newprice:item.mealPrice,Newqty:parseInt(item.mealQt),Newid:item._id,tranID2:Math.floor(Math.random()*10000)});this.handleStock()}}>
                                            
                                    <p className="card-title formatnew2">{item.mealName}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                    </>
                )
            })
        }
    }

    renderRestaurantPos(food){
        if(food) {
            return food.map((item) =>{
               
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'blueviolet'}} key={item.mealTypeID}>
                                    <button className="btn btn-blueviolet buttnheightbtn" onMouseOver={() => this.setState({menuID:item.mealTypeID})} onClick={ () => this.RestbuttonClick () }>
                                        <p className="card-title formatnew2">{item.mealType}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                        
                    </>
                )
            })
        }

    }

    getWT(){
        let waitersTableNum = sessionStorage.getItem('waitersTabNum');

        fetch(`${getWaitersTableData}${waitersTableNum}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                waiterTableData:data
            })
        })

        

        this.myTimer = setInterval(() => {
            
            this.showWaitrsTab();
            

        },1000)

        this.getWSC();

        


    }

    
    
/////// Mark Here ///////
    renderWaitersData(data){
        
        
        if (data){
            
            return data.map((item) =>{
                
                                
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'orangered'}} key={item._id}>
                                    <button className="btn btn-orangered buttnheightbtn" onMouseOver={()=>{sessionStorage.setItem('waitersTabNum', item.FirstName)}} onClick={()=>{this.getWT()}}>
                                            
                                    <p className="card-title formatnew2">{item.FirstName}</p> 
                                    </button>
                                </div>
                                
                            </center>
                        </div>
                    </>
                )
            })
        }
    }

       
    renderOders(data){
        
        if(data) {
            return data.map((item) =>{
               
                return(
                    <>
                        
                        <tr key= {item.id}>
                            {/* <td className="table-light table-striped adjust texted8">{item.id}</td> */}
                            <td className="texted8NwDescr">{item.meal}</td>
                            <td className="texted8NwQty">{item.qty}</td>
                            <td className="texted8NwPri"><NumberFormat value={item.mealPrice} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="texted8NwPri"><NumberFormat value={item.mealPrice*item.qty} thousandSeparator={true} displayType={"text"}/></td>
                        </tr>
                        
                    </>
                )
            })
        }
    }

    renderSalesReport(data){
        
        if(data) {
            return data.map((item) =>{
                
                return(
                    <>
                        
                        <tr key= {item.id}>
                            {/* <td className="table-light table-striped adjust texted8">{item.id}</td> */}
                            <td className="table-light table-striped adjust texted8">{item.productName}</td>
                            <td className="table-light table-striped adjust texted8">{item.Quantity}</td>
                            <td className="table-light table-striped adjust texted8"><NumberFormat value={item.productPrice} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust texted8"><NumberFormat value={item.productPrice*item.Quantity} thousandSeparator={true} displayType={"text"}/></td>
                            <td className="table-light table-striped adjust texted8"> </td>
                            
                        </tr>
                        
                        
                        
                    </>
                )
                
                
            })
        }
    }


    renderPos(food){
        if(food) {
            return food.map((item) =>{
               
                return(
                    <>
                        <div>
                            <center>
                                
                                <div className="card alignroomsgreen3"style={{backgroundColor:'blueviolet'}} key={item.mealTypeID}>
                                    <button className="btn btn-blueviolet buttnheightbtn" onMouseOver={() => this.setState({menuID:item.mealTypeID})} onClick={ () => this.buttonClick () }>
                                        <p className="card-title formatnew2">{item.mealType}</p> 
                                    </button>
                                </div>
                                
                                
                            </center>
                        </div>
                        
                    </>
                )
            })
        }

    }
    
    render() {
        console.log(">>> Inside RESrender", this.state)
        
        var tranDt = moment(`${this.state.transactionDate}`).format('MMM DD YYYY');
        var docketNum ='Bar'+Math.floor(Math.random()*10000);
        var add = this.state.amountPaid;
        if(this.state.amountPaid===''){
            add = 0
        }

        if(localStorage.getItem('userInfo')==null || this.state.Blogin===false){
            return(
                <>
                    <Poollogin/>
                </>
            )

        }

        return(
            <div className="posterminal">  
                               
                <br/>     
                <div className ="row quantity displayback" >
                               
                    <center>
                        <h6 style={{color:'white'}}>Add Quantity</h6>
                    </center>
                            
                    <div>
                        <div className="row">
                            <p className="prices">Price: {this.state.Newprice}</p>
                            <p className="prices2">Avail.Stock: {this.state.stockBal}</p>
                            <span className="dcrbtn">
                                <button className="form-control mb-3 formsizeX1" onClick={() =>this.decreament()}><p className="sign">-</p></button>
                            </span>
                            <span className="qtybtn">
                                <input type="number" className="form-control2 mb-3 formsizeX" style={{textAlign:'center',fontStyle:'bold',color:'white',fontSize:'24px'}}name="Newqty" value={this.state.Newqty} onChange={this.handleChange3}/>
                            </span>
                            <span className="incbtn">
                                <button className="form-control mb-3 formsizeX1" onClick={() => this.increament()}><p className="sign">+</p></button>
                            </span>
                            
                            <div className ={this.state.showPoolPos}>
                                <button className="btn btn-warning addbtn " disabled={this.state.Newqty===0||this.state.stockBal===0} onClick={() =>{this.pushorder();this.setState({docketFirst:1})}}>{this.state.Stockbtn}</button>
                            </div>
                            <div className = {this.state.showRestaurant}>
                                <button className="btn btn-warning addbtn" disabled={this.state.Newqty===0} onClick={() =>{this.pushorder();this.setState({docketFirst:1})}}>Add</button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                

                <div className="salesTable displayback">
                
                    <table className="table table-hover">
                        <thead className="table-warning">
                            <tr>
                                {/* <th className="adjust2">ID</th> */}
                                <th className="adjust2">Menu</th>
                                <th className="adjust2">Qty</th>
                                <th className="adjust2">Price(=N)</th>
                                <th className="adjust2">Amount(=N)</th>
                               
                                
                            </tr>
                        </thead>
                        <tbody className="table table-hover tableheight">
                            {this.renderOders(this.state.selected)}
                            
       
                            
                        </tbody>
                    </table>
                    
                </div>

                
                    
                <div className="amountP displayback">
                    <input type="text" className="form-control mb-3 formsizeA1 textedM" name="amountPaid" require placeholder= "Enter Payment" value={this.state.amountPaid} onChange={this.handleChange}/>
                </div>

                <div className="method displayback">
                    <select className="form-select formsizeA1 textedM" name="paymentMethod" onChange={this.handleChange}>
                        <option selected value=''>Payment Method</option>
                        {this.renderPayMeth(this.state.displayPaymentMethods)}
                    </select>
                </div>

                <button disabled={this.state.cost===0||this.state.amountPaid===''||this.state.paymentMethod==='Complimentary'||this.state.docketFirst===1} className="btn btn-primary cartBtn2 method222" onClick={() => {this.onOpenSplit();this.postQty()}}>
                        <p className="texted">Split</p>
                </button>
                
                
                <div className="textAmount displayback">
                    <p className="fmtcost2" style={{color:'white'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                </div>
                <div className="textAmount2 displayback">
                    <p className="fmtcost2" style={{color:'white'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                </div>

                <div className="operations displayback">
                    
                    <h4 className="texted4" style={{color:'white'}}>Operations</h4>
                    
                    <button disabled={localStorage.getItem('delcntrl')} className="btn btn-primary cartBtn2" onClick={() => {this.removeAll();this.setState({docketFirst:0})}}>
                        <p className="texted">Delete</p>
                    </button>
                    
                    
                    <button disabled={this.state.cost===0||this.state.amountPaid===''||this.state.amountPaid<this.state.cost||this.state.amountPaid>this.state.cost||this.state.paymentMethod===''||this.state.paymentMethod==='Complimentary'||this.state.docketFirst===1 || this.state.posting == 0} className="btn btn-primary cartBtn2jjj" onClick={() => {this.onOpenModalreceipt();this.postQty()}}>
                        <p className="texted">Post Drinks</p>
                    </button>
                    

                    
                        <button disabled={this.state.cost===0||this.state.amountPaid===''||this.state.amountPaid<this.state.cost||this.state.amountPaid>this.state.cost||this.state.paymentMethod===''||this.state.paymentMethod==='Complimentary'||this.state.docketFirst===1 || this.state.posting == 0} className="btn btn-primary cartBtn2jjj placerestbutton " onClick={() => {this.onOpenRestModalreceipt2()}}>
                            <p className="texted">Post Food</p>
                        </button>
                    
                    <select type ="button" disabled={this.state.docketFirst===1} className="form-select formsizeB mb-2 btn btn-primary texted" name="roomNumbers" onChange={this.handleChange2}>
                        <option selected value=''>Rooms</option>
                        {this.renderRooms(this.state.displayRoomNums)}
                                                                    
                    </select>
                                            
                    <button disabled={this.state.roomNumbers===''||this.state.amountPaid!=='' ||this.state.docketFirst===1 || this.state.posting == 0} className="btn btn-primary cartBtn4444" onClick={() => {this.onOpenCompModal();this.postQty()}}>
                        <p className="texted">Room Drinks Post</p>
                    </button>

                    <button disabled={this.state.roomNumbers===''||this.state.amountPaid!=='' ||this.state.docketFirst===1 || this.state.posting == 0} className="btn btn-primary cartBtn4444" onClick={() => {this.onOpenCompRestRoomModal();this.postQty()}}>
                        <p className="texted">Room Food Post</p>
                    </button>

                    <button disabled={this.state.paymentMethod!=='Complimentary'||this.state.amountPaid!==''||this.state.docketFirst===1} className="btn btn-primary cartBtn2" onClick={() =>{this.onOpenModalreceipt();this.postQty()}}>
                        <p className="texted">Comp</p>
                    </button>
                    <button disabled={this.state.docketFirst===1} className="btn btn-primary cartBtn2x2" onClick={ ()=>{this.handleReport()}}>
                        <p className="texted">Reports</p>
                    </button>
                    
                    <button disabled={localStorage.getItem('btnCntrl')} className="btn btn-warning cartBtn12aaaa" onClick={() => {this.handleGetWaitListOpen();this.setState({NewtableNum:0})}}>
                        <p className="texted">Add to Table {sessionStorage.getItem('tableNumber3')}</p>
                    </button>
                    
                    
                    <button className="btn btn-danger cartBtn20bbbb" onClick={ ()=> this.logout()}>
                        <p className="texted">Log Out {localStorage.getItem('userInfo').split(' ')[0]}</p>
                    </button>

                    <button className="btn btn-primary cartBtn112" onClick={ ()=>{this.handleWaitersOpen()}}>
                        <p className="texted">Register Waiters</p>
                    </button>
                    
                    <button className="btn btn-warning cartBtn112aa" onClick={ () => this.handleRemoveWaiters()}>
                        <p className="texted">Remove Waiters</p>
                    </button>
                    <button disabled ={this.state.selected.length===0}className="btn btn-warning setdktprnt" onClick={()=>{this.onOpenModaltoprint2();localStorage.setItem('delcntrl',true)}}>
                        <p className="texted">Prnt Docket</p>
                    </button>

                    <div className = {this.state.toggle}>
                        <button className = 'btn btn-danger cartBtn112xxx' onClick={()=>{this.showAllTab2()}}>
                            <p className="texted">Goto Sales</p>
                        </button>
                    </div>

                    <div className = {this.state.toggle}>
                        <button className = 'btn btn-warning cartBtn112xxx2' onClick={()=>{this.showAllTab2()}}>
                            <p>Total: <NumberFormat value={this.state.waitersCost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        </button>
                    </div>
                    
                </div>

                <div className= {this.state.showSalesTable}>
                    <div className="tables displayback">
                        <h5 className="texted2" style={{color:'white'}}>Get Table</h5>
                        <h5 className='texted2'style={{color:'yellow'}}>Work Date: {tranDt}</h5>
                        <div>
                            {this.renderTables(this.state.tables)}
                        
                        </div>
                        <h6 style={{color:'silver', textAlign:'right'}}>PoolBar App</h6>
                        <button className="btn btn-danger texted" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                    </div>
                </div>
                

                <div className= {this.state.showWaitersTable}>
                    <div className="tables displayback">
                        <h5 className="texted2" style={{color:'white'}}>Get Table</h5>
                        <h5 className='texted2'style={{color:'yellow'}}>Work Date: {tranDt}</h5>
                        <div>
                            {this.renderWaitersTables(this.state.waiterTableData)}
                        
                        </div>
                        <h6 style={{color:'silver', textAlign:'right'}}>PoolBar App</h6>
                        <button className="btn btn-danger texted" onClick={ ()=> {this.props.history.push('/Dashboard')}}>Goto Dashboard</button>
                    </div>
                </div>
                

                <div className = {this.state.showPoolPos}>
                    <div className ="mainmenu displayback">
                        {this.renderPos(this.state.menu)}
                    </div>
                </div>

                <div className = {this.state.showPoolBar}>
                    <div className ="menulistItems displayback">
                        {this.renderMenu(this.state.menulist)}
                    </div>
                </div>

                <div className = {this.state.showRestaurant}>
                    <div className ="RestmenulistItems displayback">
                        {this.renderRestaurant(this.state.Restmenulist)}
                    </div>
                </div>

                <div className = {this.state.showRestaurantPos}>
                    <div className ="mainmenu displayback">
                        {this.renderRestaurantPos(this.state.RestMenu)}
                    </div>
                </div>

                
                <div className ="waitersData displayback">
                    {this.renderWaitersData(this.state.WaitersData)}
                </div>

                <div className ="RestaurantData displayback">
                    <button className='btn btn-primary' onClick={()=>{this.showRest()}}>Restaurant Menu</button>
                </div>

                <div className ="PoolData displayback">
                    <button className='btn btn-primary' onClick={()=>{this.showPool()}}>Pool Bar Menu</button>
                </div>

                <Modal open={this.state.edit}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Docket</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest">Menu</th>
                                    <th className="adjust2Nwrest">Qty</th>
                                    <th className="adjust2Nwrest">Rate</th>
                                    <th className="adjust2Nwrest">Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.printSelection)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total:<NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid:<NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Waiter: {this.state.findWaiter}</p>
                            <p className="textSized">Supervisor: {localStorage.getItem('userInfo')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter2()}}>
                                    <p className="texted">{this.state.printBTN}</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.edit2}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Docket</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest">Menu</th>
                                    <th className="adjust2Nwrest">Qty</th>
                                    <th className="adjust2Nwrest">Rate</th>
                                    <th className="adjust2Nwrest">Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total:<NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid:<NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Waiter: {this.state.findWaiter}</p>
                            <p className="textSized">Supervisor: {localStorage.getItem('userInfo')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinterNew()}}>
                                    <p className="texted">{this.state.printBTN}</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>


                <Modal open={this.state.pword} onClose={()=>this.onClosePword()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Access Required</h6>
                            <div>
                                <center>
                                    
                                    <input type="password" autoComplete="off" className="form-control mb-3 formsize51" name="pass" require placeholder="Enter Access Code" value={this.state.pass} onChange={this.handleChange}/>
                                    <button disabled = {this.state.pass===''} className="btn btn-warning formsize91" onClick={()=>this.AllowRefund()}>Login</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                
                <Modal open={this.state.waiters} onClose={()=>this.handleWaitersClose()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Register A Waiter</h6>
                            <div>
                                <center>
                                    
                                    <input type="text" autoComplete="off" className="form-control mb-3 formsize51" name="waitersFName" require placeholder="Enter First Name" value={this.state.waitersFName} onChange={this.handleChange}/>
                                    <input type="text" autoComplete="off" className="form-control mb-3 formsize51" name="waiterLName" require placeholder="Enter Last Name" value={this.state.waiterLName} onChange={this.handleChange}/>
                                    <button disabled = {this.state.waitersFName && this.state.waiterLName ===''} className="btn btn-warning formsize91" onClick={()=>this.handleWaiters()}>Register</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                
                <Modal open={this.state.selectWaiter} onClose={()=>this.handleGetWaitListClose()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Select A Waiter</h6>
                            <div>
                                <center>
                                    
                                    <select type ="button" className="form-select mb-2 btn btn-primary" name="findWaiter" onChange={this.handleChange}>
                                        <option selected value=''>Click to Select</option>
                                        {this.renderWaitersList(this.state.LoadWaiters)}
                                                                                    
                                    </select>
                                    <button disabled = {this.state.LoadWaiters===''} className="btn btn-warning formsize91" onClick={()=>this.addToTable()}>Post</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.selectWaiterNew} onClose={()=>this.handleGetWaitListCloseNew()} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Select A Waiter</h6>
                            <div>
                                <center>
                                        
                                    <select type ="button" className="form-select btn mb-2 btn-primary" name="findWaiter" onChange={this.handleChange}>
                                        <option selected value=''>Click to Select</option>
                                        {this.renderWaitersList(this.state.LoadWaiters)}
                                                                                    
                                    </select>
                                    <button disabled = {this.state.LoadWaiters===''} className="btn btn-warning formsize91" onClick={()=>this.NewTable()}>Post</button>
                                    
                                </center>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.split} center>
                    <div>
                        <div className="formdesign152">
                            <h6 className="mb-3">Split Payment</h6>
                                <div>
                                    <center>
                                        
                                        <div className="displayback">
                                            <p>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                                        </div>
                                        <div className="displayback">
                                            <p>Bal: <NumberFormat value={this.state.cost- this.state.splitBal - parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                                        </div>

                                        <div className="displayback">
                                            <input type="text" className="form-control mb-3 formsize51" name="amountPaid" require placeholder= "Enter Payment" value={this.state.amountPaid} onChange={this.handleChangeComp}/>
                                        </div>
                                        
                                        <select type ="button" className="form-select mb-2 btn btn-primary" name="paymentMethod" onChange={this.handleChange}>
                                            <option selected value=''>Payment Method</option>
                                            {this.renderPayMeth(this.state.displayPaymentMethods)}
                                                                                        
                                        </select>
                                        <button disabled = {this.state.paymentMethod === ''} className="btn btn-warning formsize91" onClick={()=>this.onOpenModalsplitreceipt()}>Post Drinks</button>
                                        <button disabled = {this.state.paymentMethod === ''} className="btn btn-warning formsize91" onClick={()=>this.onOpenRestModalreceipt()}>Post Food</button>
                                        <button disabled = {this.state.cost- this.state.splitBal - parseFloat(add) !== 0}className="btn btn-warning formsize91" onClick={()=>this.onCloseSplit()}>Close</button>
                                        
                                    </center>
                                </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.editsplitreceipt} onClose={()=>{this.onCloseModalsplitreceipt();this.handleSplitSubmit()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Receipt</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">Print</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseModalsplitreceipt();this.handleSplitSubmit()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.Resteditreceipt} onClose={()=>{this.onCloseRestModalreceipt();this.handleRestSubmit()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Food Receipt</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">Print</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseRestModalreceipt();this.handleRestSubmit()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.Resteditreceipt2} onClose={()=>{this.onCloseRestModalreceipt();this.handleRestSubmit2()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Food Receipt</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">Print</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseRestModalreceipt2();this.handleRestSubmit2()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>


                <Modal open={this.state.editreceipt} onClose={()=>{this.onCloseModalreceipt();this.handleSubmit()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                            <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Receipt</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">Print</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseModalreceipt();this.handleSubmit()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                

                <Modal open={this.state.compModal} onClose={()=>{this.onCloseCompModal();this.handleRoomSubmit()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                        <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Docket</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">{this.state.printBTN}</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseCompModal();this.handleRoomSubmit()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.RestRmcompModal} onClose={()=>{this.onCloseCompRestRoomModal();this.handleRoomSubmit2()}}>
                    
                    <div className = "papersizeNew">
                        <hr/>
                        <center>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSizedNumber">+234 802 288 8776</p>
                        <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Food Docket</p>
                            <p className="textSized">Date: {tranDt}</p>
                            <p className="textSized mb-3">Docket Num: {docketNum}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="tableSettingsNow">
                            <thead>
                                <tr>
                                    {/* <th className="adjust2Nw" style={{fontSize:'10px'}}>ID</th> */}
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Rate</th>
                                    <th className="adjust2Nwrest" style={{fontSize:'10px'}}>Amt</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="tableSettingsNow">
                                {this.renderOders(this.state.selected)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Total: <NumberFormat value={this.state.cost} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Amount Paid: <NumberFormat value={add} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Bal: <NumberFormat value={this.state.cost-parseFloat(add)} thousandSeparator={true} displayType={"text"}/>.00</p>
                        <p style={{fontSize:'10px', fontFamily: 'Arial, Helvetica, sans-seri'}}>Payment Method: {this.state.paymentMethod}</p>
                        <hr/>
                        
                        <center>
                            <p className="textSized">Prepared By: {localStorage.getItem('userInfo')}</p>
                            <p className="textSized">Shift: {localStorage.getItem('shift')}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">{this.state.printBTN}</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseCompRestRoomModal();this.handleRoomSubmit2()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                {/* view daily sales report */}
                <Modal open={this.state.report} onClose={()=>{this.onCloseModalreport()}}>
                    
                    <div className = "posPrint">
                        <hr/>
                        <center>
                        <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.Hotelname}</p>
                            <p className="textSized mb-3">{this.state.Hoteladdress}</p>
                            <p className="textSized mb-3">{this.state.Hotelphone}</p>
                        <hr/>
                            <p className="textSized" style={{fontWeight:'bold',fontSize:'14px'}}>Pool Bar Daily Sales Report</p>
                            <p className="textSized">Report Date: {tranDt}</p>
                            <p className="textSized mb-3">Shift: {this.state.useReportShift}</p>
                            
                        </center>
                        <hr/>
                        
                        <table className="table table-hover">
                            <thead className="table-warning">
                                <tr>
                                    <th className="adjust2" style={{fontSize:'10px'}}>ID</th>
                                    <th className="adjust2" style={{fontSize:'10px'}}>Menu</th>
                                    <th className="adjust2" style={{fontSize:'10px'}}>Qty</th>
                                    <th className="adjust2" style={{fontSize:'10px'}}>Price(=N)</th>
                                    <th className="adjust2" style={{fontSize:'10px'}}>Amount(=N)</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="table table-hover tableheight">
                                {this.renderSalesReport(this.state.DrinkSalesQtyReportData)}
                                
                            </tbody>
                            
                            
                        </table>
                        <hr/>
                        <p style={{fontSize:'14px', fontWeight:'bold'}}>Total Sales: <NumberFormat value={this.state.totalSales} thousandSeparator={true} displayType={"text"}/>.00</p>
                        
                        <hr/>
                        
                        <center>
                            <p className="textSized">Staff: {this.state.useReportName}</p>
                            <p className="textSized">Shift: {this.state.useReportShift}</p>
                            <p style={{fontSize:'13px', fontWeight:'bold'}}>THANK YOU</p>

                            <div className="printing">
                                <button className={this.state.shiftcolor} onClick={()=>{this.sendtoprinter()}}>
                                    <p className="texted">{this.state.printBTN}</p>
                                </button>
                                <button className={this.state.shiftcolor} onClick={()=>{this.onCloseModalreport()}}>
                                    <p className="texted">Close</p>
                                </button>
                               
                            </div>
                           

                        </center>
                        

                    </div>
        
                </Modal>

                <Modal open={this.state.credit} onClose={()=>this.onCloseModalCredit()} style={{color:"silver"}}>
                    <div className = "background591stockin">
                        <h6 style = {{color:'silver',marginLeft:'50px', marginBottom:'-70px'}}>Recover Credit</h6>
                        <div className="formdesign511">
                            <div className="container">
                                <div className="row">
                                    <h6>Summary</h6>
                                    <div className="col-3">
                                        <label>Total Credit</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCredit)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>

                                    <div className="col-3">
                                        <label>Total Recovered</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCreditPaid)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>
                                    
                                    <div className="col-3">
                                        <label>Credit Balance</label>
                                        <p type="text" className="form-control mb-3 formsize51 ikem"><NumberFormat value={parseInt(this.state.TotalCredit)-parseInt(this.state.TotalCreditPaid)} thousandSeparator={true} displayType={"text"}/></p>
                                    </div>
                                    
                                    
                                </div>
                                <div className='row'>
                                    <div className="col-4">
                                            <input type="number" className="form-control mb-3 formsize51 ikem" name="creditPaid" require placeholder="Enter Amount" value={this.state.creditPaid} onChange={this.handleChange}/>
                                    </div>

                                    <div className="col-4">
                                        <select className="form-select formsize51 ikem" name="paymentMethod" onChange={this.handleChange}>
                                            <option selected value=''>Payment Method</option>
                                            {this.renderPayMeth(this.state.payNwMeth)}
                                        </select>
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="row">
                                
                                <br/><br/>
                                <center>
                                    <span>
                                        <button disabled ={this.state.creditPaid===''} className="btn btn-warning gap" onClick={()=>this.postCredit()}>Post</button>
                                        <button className="btn btn-danger gap" onClick={ () => this.onCloseModalCredit()}>Close</button>
                                                
                                    </span>
                                            
                                </center>
                                <br/>
                        
                            </div>
                            
                        </div> 
                        
                    </div>  

                </Modal>
                
            </div>

        )
    }


    async componentDidMount(){
        console.log (">>> Inside RESdidMount")
       

        fetch(`${restMenugrpUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                menu:data
            })
        })

        
        fetch(`${RestaurantMenugrpUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                RestMenu:data
            })
        })

        this.myTimer = setTimeout(() => {
                
    
        },30000)

        fetch(`${getwaitersData}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
                       
            this.setState({
                WaitersData:data,
                
                
            })
            return 'ok'
            
        })

        fetch(`${getwaitersCost}`, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            let totalbicost = data.map(item => item).reduce((totals, item) =>{
                return  totals + parseFloat(item.billCost)
            }, 0);
           
            this.setState({
                
                waitersCost: totalbicost
                
            })
            return 'ok'
            
        })

        this.myTimer = setTimeout(() => {
            fetch(`${getwaitersData}`, {method: 'GET'})
            .then((res) => res.json())
            .then((data) => {
                        
                this.setState({
                    WaitersData:data,
                    
                    
                })
                return 'ok'
                
            })

            fetch(`${getwaitersCost}`, {method: 'GET'})
            .then((res) => res.json())
            .then((data) => {
                let totalbicost = data.map(item => item).reduce((totals, item) =>{
                    return  totals + parseFloat(item.billCost)
                }, 0);
            
                this.setState({
                    
                    waitersCost: totalbicost
                    
                })
                return 'ok'
                
            })
    
        },30000)

        fetch(`${getStoreData}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkstoreData:data
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

        await fetch(`${getWorkDate}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            data.map((item)=>{
                this.setState({transactionDate:item.date})
                return 'ok'
            })
            
           
        })

        this.myTimer = setInterval(() => {
            fetch(`${getWorkDate}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                data.map((item)=>{
                    this.setState({transactionDate:item.date})
                    return 'ok'
                })
                
            
            })
            

        },1000)

        fetch(`${getPaymentMethods}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                payNwMeth:data
            })
        })

        fetch(`${getBarSalesQty}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                DrinkSalesQtyData:data
            })
        })


        fetch(`${getTable}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({tables:data})
        });
        this.myTimer = setTimeout(() => {

            fetch(`${getTable}`, {method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                this.setState({tables:data})
            });

            localStorage.setItem('btnCntrl',true)


        },2000)

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

        if(localStorage.getItem('shift')==='Morning Shift'){
            this.setState({shiftcolor:"btn btn-primary cartBtn20"})
        }
        else if(localStorage.getItem('shift')==='Night Shift'){
            this.setState({shiftcolor:"btn btn-dark cartBtn20"})
        }
        else if(localStorage.getItem('shift')==='All Day'){
            this.setState({shiftcolor:"btn btn-warning cartBtn20"})
        }
        
    }
}
export default PoolBar;