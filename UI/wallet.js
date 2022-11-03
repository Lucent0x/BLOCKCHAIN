import Head from 'next/Head'
import { useState, useEffect } from 'react'
import styles from '../styles/wallet.module.css'
import  'bulma/css/bulma.css'
import Web3 from 'web3'

const  Wallet =  ( ) =>{

    // STATE VARIABLES
    const [error, setError ] = useState('')
    const [web3, setWeb3 ] = useState(null)

    const connectWalletHandler = async ( ) =>{
        if( typeof  window !== 'undefined' && typeof window.ethereum !== 'undefined'){
           try {
            //requesting for wallet connection
          await   window.ethereum.request({ method: 'eth_requestAccounts'})
            web3 = new Web3(window.ethereum)
           setWeb3(web3)

           } catch (error) {
            setError(error.message)
           } 
        }else{
            setError('pls install metamask');
        }
    }

    
    return(
        <div className={styles.main}>
            <Head>
                <title> Blockchain Wallet</title>
                <meta name="description" content="A wallet built on a blockchain" />        
           </Head>
               <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.1/js/all.min.js" ></script>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap" rel="stylesheet" />

           <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1 > LUCIDITY WALLET
                            <p className='has-text-primary is light '>CA: Contract Address
                           <span className='has-text-link'><i className='fas fa-copy'></i></span> </p> 
                      </h1> 
                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary' onClick={connectWalletHandler}> Connect <i className={`fas fa-wallet ${styles.i} `}></i></button>
                    </div>
                </div>
           </nav>
           <section>
            <section className='container'>
                                            <div className="card">
                                                <div className="card-content  has-text-centered">
                                                            <p className="title">WALLET OWNER </p>
                                                            <p className="subtitle"> balance </p>
                                                </div>
                                <footer className="card-footer">
                                                <div className="card-footer-item">
                                                 <div className={`control ${styles.flex}`}>
                                                    <input  className="input is-medium is-focused" type="text" placeholder="Amount " />
                                                    <button  className='button is-info end ml-6 is-medium' > DEPOSIT </button>
                                                </div>
                                                </div>

                                                <div className="card-footer-item">
                                                <div className={`control ${styles.flex}`}>
                                                    <input  className="input is-medium is-focused" type="text" placeholder="Reciever Address" />
                                                    <button className='button is-success ml-6 is-medium'> TRANSFER </button>
                                                </div>
                                                </div>
                                </footer>
                                <div className="card-content mt-4">
                                            <div className='card-footer'>
                                                           
                                                <div className={`card-footer-item ${styles.flow}`}> <div className='subtitle has-text-centered box has-text-success'>
                                                  <b> Recorded  "present" Successful Transactions </b> 

                                                            <ul className={`subtitle  `}>
                                                              <p><b className='mt-3'>Your Last Transaction <i className="fas fa-hand-point-down"></i></b>  </p>
                                                               <li className='box'> INDEX: <b>Transaction Id</b> Tag: <b>Transaction type </b>
                                                                                                 <b> Transaction Amount</b>      
                                                                </li>  
                                                            </ul>
                                                </div>

                                                </div>
                                                <div className='card-footer-item'>
                                                <div className='box'>
                                                <div className={`control ${styles.flex}`}>
                                                    <input  className="input is-medium is-focused" type="text" placeholder="Transaction ID " />
                                                    <button className='button is-info end ml-6 is-medium'> FETCH </button>
                                                </div>
                                                    <div className='subtitle mt-6'>
                                                        <ul className='box has-text-primary mt-4'>
                                                         <li><b> Transaction id: </b>  <i> Transaction Id</i></li>  
                                                          <li><b> Type: </b>  <i> Transaction Type </i></li> 
                                                          <li><b> Amount: </b>  <i> Transaction Amount </i> </li>
                                                          <li> <a className='has-text-link' href={`https://mumbai.polygonscan.com/address/`} target="_blank"><b> Reciever: </b>  <i> Transaction reciever </i></a></li>
                                                          <li><a className='has-text-link' href={`https://mumbai.polygonscan.com/address/`} target="_blank"><b> Sender: </b>  <i>  Transaction sender </i> </a></li>
                                                             </ul>
                                                    </div>
                                                </div>
                                                
                                                </div>
                                            </div>
                                                </div>
                                </div>
            </section>
            <div className='has-text-danger'>
              <p>  {error} </p>
            </div>
            <div className='has-text-success'>
              <p>  Successful </p>
            </div>
           </section>
        </div>
    )
}

export default Wallet;