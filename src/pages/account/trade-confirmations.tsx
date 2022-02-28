import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../watchlist/index.scss';
import SearchIcon from '../../assets/images/search.svg';
import SlidersIcon from '../../assets/images/sliders.svg';
import UserAreaHeader from '../../components/Headers/UserAreaHeader';
import RemoveStockIcon from '../../assets/images/remove-stock.svg';
import Sidebar from '../../components/Sidebar';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import axios from 'axios';
import * as HelperFunctions from '../../lib/helper';
import AnchoriaIcon from '../../assets/images/anchoria-icon.svg';
import AnchoriaSpinner from '../../assets/images/anchoria-spinner.svg';
import GreenBoxIcon from '../../assets/images/green-box.svg';
import RedBoxIcon from '../../assets/images/red-box.svg';
import BlueBoxIcon from '../../assets/images/blue-box.svg';
import moment from 'moment';
import { stockTradingServiceBaseUrlUrl } from '../../apiUrls';
import { getAxios } from '../../network/httpClientWrapper';


const TradeConfirmations = () => {
    document.title = "Trade Confirmations - Anchoria";

    const [showModalBG, setShowModalBG] = useState<boolean>(false);
    const [showRemoveStockModal, setShowRemoveStockModal] = useState<boolean>(false);

    const [switchToAll, setSwitchToAll] = useState<boolean>(true);
    const [switchToOpen, setSwitchToOpen] = useState<boolean>(false);
    const [switchToExecuted, setSwitchToExecuted] = useState<boolean>(false);
    const [switchToRejected, setSwitchToRejected] = useState<boolean>(false);
    const [switchToCancelled, setSwitchToCancelled] = useState<boolean>(false);
    const [switchToSold, setSwitchToSold] = useState<boolean>(false);

    const [showPageLoader, setShowPageLoader] = useState<boolean>(true);

    const [orderAll, setOrderAll] = useState('');
    const [orderOpen, setOrderOpen] = useState('');
    const [orderExecuted, setOrderExecuted] = useState('');
    const [orderRejected, setOrderRejected] = useState('');
    const [orderCancelled, setOrderCancelled] = useState('');
    const [orderSold, setOrderSold] = useState('');

    useEffect(()=>{
        function getAllOrders(){

            setShowPageLoader(true);
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/all')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const allOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderAll(allOrders);
                }

                setShowPageLoader(false);
            })
            .catch(function (error) {
                setShowPageLoader(false);
               
            });
        }

        function getOpenOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/open')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const openOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderOpen(openOrders);
                }
            })
            .catch(function (error) {
    
               
            });
        }

        function getExecutedOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/executed')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const executedOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderExecuted(executedOrders);
                }
            })
            .catch(function (error) {
    
               
            });
        }

        function getRejectedOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/rejected')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const rejectedOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderRejected(rejectedOrders);
                }
            })
            .catch(function (error) {
    
               
            });
        }

        function getCancelledOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/order/cancelled')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const cancelledOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderCancelled(cancelledOrders);
                }
            })
            .catch(function (error) {
    
               
            });
        }

        function getSoldOrders(){
    
            getAxios(axios).get(stockTradingServiceBaseUrlUrl+'/stock/sold?pageNo=0&pageSize=20')
            .then(function (response) {
                HelperFunctions.removeOverflowAndPaddingFromModalBody();
                
                if(response.data.data.length > 0){
                    const soldOrders = response.data.data.map((item :any, index :any)=>
                    <div className="portfoliolist-card card mb-30 cursor-pointer" key={index}>
                        <div className="md:flex md:justify-between md:items-center text-sm">
                            <div className='flex-child md:mb-0 mb-4'><img src={Math.floor(Math.random() * 4) === 1 ? GreenBoxIcon : Math.floor(Math.random() * 4) === 2 ? RedBoxIcon : BlueBoxIcon} alt="" style={{width: '2rem'}}/></div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.stockCode}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold mb-10'>{item.name}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{parseInt(item.qty)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>₦ {HelperFunctions.formatCurrencyWithDecimal(parseInt(item.qty) * item.quotePrice)}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{item.status === 'AWAIT_EXECUTION' ? 'Open' : item.status}</div>
                            </div>

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <div className='font-bold '>{moment(item.orderDate).format("MMM Do, YYYY hh:mm A")}</div>
                            </div> 

                            <div className="text-color-2 flex-child md:mb-0 mb-4">
                                <Link to={"/stock?name="+item.name+"&symbol="+item.stockCode+"&close="+item.quotePrice+"&tradeAction=sell"}>
                                    <button type='button' className="rounded-lg bg-green-800 py-3 px-5 border-0 font-bold text-white cursor-pointer">View</button></Link>
                            </div> 
                            
                        </div>
                    </div>
                    );

                    setOrderSold(soldOrders);
                }
            })
            .catch(function (error) { });
        }

        getAllOrders();
        getOpenOrders();
        getExecutedOrders();
        getRejectedOrders();
        getCancelledOrders();
        getSoldOrders();

    },[])

    function performSwitchToAll(){
        setSwitchToAll(true);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
        setSwitchToSold(false);
    }

    function performSwitchToOpen(){
        setSwitchToAll(false);
        setSwitchToOpen(true);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
        setSwitchToSold(false);
    }

    function performSwitchToExecuted(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(true);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
        setSwitchToSold(false);
    }

    function performSwitchToRejected(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(true);
        setSwitchToCancelled(false);
        setSwitchToSold(false);
    }

    function performSwitchToCancelled(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(true);
        setSwitchToSold(false);
    }

    function performSwitchToSold(){
        setSwitchToAll(false);
        setSwitchToOpen(false);
        setSwitchToExecuted(false);
        setSwitchToRejected(false);
        setSwitchToCancelled(false);
        setSwitchToSold(true);
    }

    function closeModal(){
        setShowModalBG(false);
        setShowRemoveStockModal(false);
    }

    return (
        <div className="relative">
            <UserAreaHeader />

            <div>
                <div className="h-screen flex">
                    <Sidebar />

                    <div className="mt-20 flex-1 min-w-0 flex flex-col">
                        <div className='p-10 flex-1 bg-gray-100 overflow-y-auto'>
                            <div className="flex justify-between mb-10">
                                <div className="font-bold text-green-900 text-3xl">Trade Confirmations</div>
                                <div className="font-bold">
                                    <Link to="/account" className='no-underline text-green-900'>
                                        <img src={ArrowBackIcon} alt="" className="align-middle" /> Back
                                    </Link>
                                </div>
                            </div>

                            <div className="text-sm font-bold text-color-2 mb-30">Summary of all your trades</div>

                            {/*Switch Search*/}
                            <div className="mb-20">
                                <div className="md:flex md:justify-between w-full">
                                    <div>
                                        <div className="border_1 md:flex rounded-lg p-02rem">
                                            <div>
                                                <button onClick={performSwitchToAll} type='button' className={switchToAll ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>All</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToOpen} type='button' className={switchToOpen ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>Open</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToExecuted} type='button' className={switchToExecuted ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>Executed</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToRejected} type='button' className={switchToRejected ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>Rejected</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToCancelled} type='button' className={switchToCancelled ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>Cancelled</button>
                                            </div>

                                            <div>
                                                <button onClick={performSwitchToSold} type='button' className={switchToSold ? "rounded-lg bg-green-900 text-white border-0 py-3 px-12 font-bold cursor-pointer w-full" : "cursor-pointer rounded-lg py-3 px-12 font-bold border-0 bg-transparent w-full"}>Sold</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='hidden'>
                                        <div className="flex space-x-3">
                                            <div>
                                                <Link to="/trade" className='no-underline text-green-900'>
                                                    <button type="button" className="border-0 rounded-lg py-2 px-3 button-filter  cursor-pointer">
                                                        <img src={SlidersIcon} alt="" />
                                                    </button>
                                                </Link>
                                            </div>

                                            <div className="w-80 right-0 flex border_1 rounded-lg pr-3 bg-white">
                                                <div className="pl-3 py-2"><img src={SearchIcon} alt="" /></div>

                                                <div className='w-full'>
                                                    <input type="text" className="outline-white p-2 input border-0" placeholder="Quick search"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Card section*/}
                            <div>
                                <div className="card mb-20 text-sm p-5">
                                    <div className="md:flex md:justify-between md:items-center">
                                        <div className="font-bold text-color-2 flex-child opacity-0 md:block hidden">Blank</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Code</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Name</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Qty</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Amount</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Status</div>
                                        <div className="font-bold text-color-2 flex-child md:mb-0 mb-4">Date</div>
                                        <div className="font-bold text-color-2 flex-child md:block hidden opacity-0">Blank</div>
                                    </div>
                                </div>

                                {/*All Section*/}
                                <div className={switchToAll ? '':'hidden'}>
                                    <div className={orderAll === '' ? 'text-gray-500 text-center':'hidden'}>No trades to display</div>

                                    <div>{orderAll}</div>
                                </div>
                                {/*End*/}

                                {/*Open Section*/}
                                <div className={switchToOpen ? '':'hidden'}>
                                    <div className={orderOpen === '' ? 'text-gray-500 text-center':'hidden'}>No open trades to display</div>

                                    <div>{orderOpen}</div>
                                </div>
                                {/*End*/}

                                {/*Executed Section*/}
                                <div className={switchToExecuted ? '':'hidden'}>
                                    <div className={orderExecuted === '' ? 'text-gray-500 text-center':'hidden'}>No executed trades to display</div>

                                    <div>{orderExecuted}</div>                                
                                </div>
                                {/*End*/}

                                {/*Rejected Section*/}
                                <div className={switchToRejected ? '':'hidden'}>
                                    <div className={orderRejected === '' ? 'text-gray-500 text-center':'hidden'}>No rejected trades to display</div>

                                    <div>{orderRejected}</div> 
                                </div>
                                {/*End*/}

                                {/*Cancelled Section*/}
                                <div className={switchToCancelled ? '':'hidden'}>
                                    <div className={orderCancelled === '' ? 'text-gray-500 text-center':'hidden'}>No cancelled trades to display</div>

                                    <div>{orderCancelled}</div> 
                                    
                                </div>
                                {/*End*/}

                                {/*Sold Section*/}
                                <div className={switchToSold ? '':'hidden'}>
                                    <div className={orderSold === '' ? 'text-gray-500 text-center':'hidden'}>No sold trades to display</div>

                                    <div>{orderSold}</div> 
                                    
                                </div>
                                {/*End*/}
                            </div>
                            {/*End*/}

                            {/*Pagination section*/}
                            <div className='hidden'>
                                <div>
                                    <ul className='pagination list-none font-bold flex space-x-2 justify-end cursor-pointer text-sm'>
                                        <li className='font-bold text-green-900 rounded-lg'>Previous</li>
                                        <li className='text-color-9 rounded-lg'>1</li>
                                        <li className='text-color-9 rounded-lg'>2</li>
                                        <li className='text-color-9 rounded-lg active'>3</li>
                                        <li className='text-color-9 rounded-lg'>4</li>
                                        <li className='text-color-9 rounded-lg'>5</li>
                                        <li className='font-bold text-green-900 rounded-lg'>Next</li>
                                    </ul>
                                </div>
                            </div>
                            {/*End*/}

                            {/* Page Loader Section */}
                            <div className={showPageLoader ? "page-loader-backdrop opacity-90":"hidden"}>
                                <div className='w-96 relative lg:ml-72'>
                                    <div className='absolute top-44pc left-46pt5pc'><img src={AnchoriaIcon} alt="" /></div>
                                    <div className='text-center'><img src={AnchoriaSpinner} alt=""/></div>
                                </div>
                            </div>
                            {/* End */}
                        </div>
                        
                    </div>                    
                </div>
            </div>

            <div className={showRemoveStockModal ? "removeStock-modal" : "removeStock-modal hidden"}>
                <div className='text-center mb-10'><img src={RemoveStockIcon} alt="" /></div>
                <div className='text-center text-3xl font-gotham-black-regular mb-10'>Remove Stocks</div>
                <div className='text-center mb-30 text-sm leading-5'>
                Are you sure you want to remove this stocks from your watchlist?
                </div>

                <div className='flex space-x-3'>
                    <button onClick={closeModal} type='button' className='cursor-pointer w-40 rounded-lg border-0 bg-gray-300 text-24 p-3 font-bold'>Cancel</button>

                    <button onClick={closeModal} type='button' className='cursor-pointer rounded-lg border-0 bg-green-900 text-white text-24 p-3 font-bold w-96'>Confirm</button>
                </div>
            </div>

            <div className={showModalBG ? "modal-backdrop opacity-40":"modal-backdrop opacity-40 hidden"}>
            </div>
        </div>
    );
};

export default TradeConfirmations;