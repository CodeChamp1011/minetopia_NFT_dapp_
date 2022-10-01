/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import swal from "sweetalert";
import CountdownTimer from "../../component/CountdownTimer";
import { Link } from "react-router-dom";
import PdfWhitepaper from "../../assests/docs/Minetopia_Whitepaper.pdf";
import PdfReport from "../../assests/docs/Report.pdf";
import Certificate from "../../assests/certificate.jpeg";

function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    FINNEY_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const LEFT_DAYS_IN_MS =
    new Date("2022-09-01T12:00:00-00:00").getTime() - new Date().getTime();
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + LEFT_DAYS_IN_MS;

  const claimNFTs = () => {
    let cost = data.cost;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        swal(
          "Sorry, something went wrong please try again later.",
          "",
          "error"
        );
        setClaimingNft(false);
      })
      .then((receipt) => {
        swal(`WOW, the ${CONFIG.NFT_NAME} is yours!`, "", "success");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const countPlus = () => {
    if (mintAmount < 10) {
      setMintAmount(mintAmount + 1);
    }
  };

  const countMinus = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const conectWallet = () => {
    swal("Please connect Metamask first.", "", "warning");
  };

  return (
    <div>
      <nav>
        <a href='/'>
          <img className='logo-image' src='./assets/images/full_logo.png' />
        </a>
        {(toggleMenu || screenWidth > 1190) && (
          <ul className='list'>
            <li className='items'>
              <a className='nav-item' href='#'>
                Home
              </a>
            </li>
            <li className='items'>
              <a className='nav-item' href='#mint'>
                Mint
              </a>
            </li>
            {/* <li className="items"><a className="nav-item" href="#buy">Transfer</a></li>
						<li className="items"><a className="nav-item" href="#buy">Airdrop</a></li> */}
            <li className='items'>
              <a className='nav-item' href='#roadmap'>
                Roadmap
              </a>
            </li>
            <li className='items'>
              <a
                className='nav-item'
                href={PdfWhitepaper}
                target='_blank'
                rel='noopener noreferrer'>
                Whitepaper
              </a>
            </li>
            <li class='nav-item items dropdown'>
              <div class='dropbtn'>Audit</div>
              <div class='dropdown-content'>
                <a
                  className='sub-item'
                  href={PdfReport}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {" "}
                  Report
                </a>
                <a
                  className='sub-item'
                  href={Certificate}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {" "}
                  Certificate
                </a>
              </div>
            </li>
            <li className='items'>
              <a className='nav-item' href='#team'>
                Team
              </a>
            </li>
            <li className='items'>
              <a className='nav-item' href='#faq'>
                Faq
              </a>
            </li>
          </ul>
        )}
        <div className='social-block'>
          <a href='https://twitter.com/MinetopiaNFT' target='_blank'>
            <i className='fab fa-twitter social-icon'></i>
          </a>
          <a href='https://www.youtube.com/' target='_blank'>
            <i className='fab fa-youtube social-icon'></i>
          </a>
          <a href='https://discord.gg/bJ9Z87dFDp' target='_blank'>
            <i className='fab fa-discord social-icon'></i>
          </a>
        </div>
        <a onClick={toggleNav} className='menu-btn'>
          <i className='fas fa-bars'></i>
        </a>
        <div className='navbar_right'>
          {blockchain.account == null && blockchain.account == undefined ? (
            <button
              className='connect-button btn ml-2 text-center'
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
                getData();
              }}>
              CONNECT WALLET
            </button>
          ) : (
            <span className='connected-button ml-2 text-center'>
              {String(blockchain.account).substring(0, 4) +
                "..." +
                String(blockchain.account).substring(38)}
            </span>
          )}
        </div>
        <div className='navbar-right'>
          <CrossmintPayButton
            className='connect-button crossmint btn'
            style={{ padding: "1px" }}
            collectionTitle='MineTopia'
            collectionDescription='Minetopia presents an opportunity for individuals to enter mining through the utility of Non-fungible Tokens (NFTs). 
						The potential mining options will include Bitcoin (BTC), Ethereum Classic (ETC), Kadena (KDA), and Litecoin (LTC) with free Dogecoin (DOGE). 
						As such, the project has found the blockchain to be a perfect form of distribution for mining rewards and achieving community-centric goals. 
						Minetopia is built with the expertise of well-versed marketers, developers, and designers who desire to work with a community to change the world for the betterment of earnings moving forward.'
            collectionPhoto='https://ipfs.io/ipfs/QmVGNCPsiuEcPsZmY4jyH5F6cRsfxggsoSg7TgZ7W7myjA/'
            clientId='4a79af24-12f9-4c22-b364-f9ff2d3b3df8'
            mintConfig={{
              type: "erc-721",
              totalPrice: "0.190",
            }}
          />
        </div>
      </nav>

      <section className='hero-section wow zoomIn'>
        <video className='landing-video width-100' autoPlay={true} muted loop>
          <source
            src='./assets/images/ethereum_classic.mp4'
            type='video/webm'></source>
        </video>
      </section>

      <div className=''>
        <section className='about-section' id='buy'>
          <div className='main-container'>
            <div className='col-12 text-center d-flex justify-content-center wow fadeInUp'>
              <span className='section_title line-height-15'>
                WELCOME TO THE MINETOPIA
              </span>
            </div>
            <CountdownTimer targetDate={dateTimeAfterThreeDays} />
            <div className='text-justify pt-30 px-5 line-height-15 font_general wow fadeInUp'>
              Minetopia presents an opportunity for individuals to enter mining
              through the utility of Non-fungible Tokens (NFTs). The potential
              mining options will include Bitcoin (BTC), Ethereum Classic (ETC),
              Kadena (KDA), and Litecoin (LTC) with free Dogecoin (DOGE). As
              such, the project has found the blockchain to be a perfect form of
              distribution for mining rewards and achieving community-centric
              goals. Minetopia is built with the expertise of well-versed
              marketers, developers, and designers who desire to work with a
              community to change the world for the betterment of earnings
              moving forward.
            </div>
            <div className='row mx-0 px-0 pt-30'>
              <div className='col-md-6 mt-md-0 px-5 mr-0'>
                <div className='font_general line-height-15 mb-5 wow fadeInLeft'>
                  • NFTs are unique tokenized representations of digital files
                  exchanged on public blockchains. In the first quarter of 2022,
                  an estimated $8 billion* NFT transactions were generated. NFTs
                  are clearly gaining momentum day by day. While the prices of
                  individual NFTs vary, fascinating use cases for NFTs are still
                  emerging and the groundwork for their long-term utility is
                  being built for seamless integration into our daily lives.
                </div>
              </div>
              <div className='col-md-6 px-5'>
                <div className='font_general line-height-15 mb-5 wow fadeInRight'>
                  • Like cryptocurrencies, NFTs are issued on a blockchain or
                  decentralized ledger and are used to designate ownership of a
                  certain asset and/or contract. Each NFT is tied to unique
                  data, typically a digital content file or reference, and
                  governed by a smart contract. The process of converting this
                  data into a Non-fungible Token is referred to as minting. Once
                  minted, the NFT is written to the applicable blockchain
                  database.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='slide-container main-container' id='mint'>
          <div className='col-12 text-center d-flex justify-content-center wow fadeInUp'>
            <div className='section_title line-height-15'>MINETOPIA NFT</div>
          </div>
          <div className='coolbeez-content text-justify font_general line-height-18 pt-30 wow bounceIn'>
            Minetopia is driven to provide a variety of mining opportunities for
            those who wish to participate through owning a Minetopia NFT.
            Participating in a project that utilizes NFTs to give a stake or
            ownership in a miner’s reward could boost an individual’s portfolio
            to the next level through sustainable returns driven by
            community-purchased ASIC miners.
          </div>
          <div className='col-md-12 text-center count-section'>
            <button onClick={countMinus} className='count-btn count-minus'>
              -
            </button>
            <span className='mint-amount'>{mintAmount}</span>
            <button onClick={countPlus} className='count-btn'>
              +
            </button>
          </div>
          <div className='col-md-12 text-center wow zoomInUp mint-button-section'>
            <button
              className='mint_button mt-3'
              disabled={claimingNft ? 1 : 0}
              onClick={(e) => {
                e.preventDefault();
                {
                  blockchain.account != null ? claimNFTs() : conectWallet();
                }
                getData();
              }}>
              {claimingNft ? "MINTING..." : "MINT"}
              {data.totalSupply > 0 ? (
                <span className='mint-count'>({data.totalSupply}/1000)</span>
              ) : (
                <span></span>
              )}
            </button>
          </div>
          <div className='row mx-0 main-container'>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <img
                className='slide_image img-thumbnail'
                src='./assets/images/Ethereum.png'
                alt=''
              />
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <img
                className='slide_image img-thumbnail'
                src='./assets/images/Ethereum_blank.png'
                alt=''
              />
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <img
                className='slide_image img-thumbnail'
                src='./assets/images/Ethereum_blank.png'
                alt=''
              />
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <img
                className='slide_image img-thumbnail'
                src='./assets/images/Ethereum_blank.png'
                alt=''
              />
            </div>
          </div>
          {/* <div className="swiper mySwiper wow fadeIn">
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<img className="slide_image img-thumbnail" src="./assets/images/Ethereum.png" alt=""/>
							</div>
							<div className="swiper-slide">
								<img className="slide_image img-thumbnail" src="./assets/images/Ethereum_blank.png" alt=""/>
							</div>
							<div className="swiper-slide">
								<img className="slide_image img-thumbnail" src="./assets/images/Ethereum_blank.png" alt=""/>
							</div>
							<div className="swiper-slide">
								<img className="slide_image img-thumbnail" src="./assets/images/Ethereum_blank.png" alt=""/>
							</div>
						</div>
						<div className="swiper-pagination"></div>
					</div> */}
        </section>

        <section className='join-discord'>
          <div className='row main-container'>
            <div
              className='col-md-5 col-sm-12 text-center wow slideInLeft'
              data-wow-offset='0'>
              <img
                className='discord-bee'
                src='./assets/images/half_logo_trans.png'
              />
            </div>
            <div
              className='col-md-7 col-sm-12 text-block d-flex align-items-center text-center wow slideInRight'
              data-wow-offset='0'>
              <div className='pl-md-3'>
                <div className='join-discord-title rubik-font'>
                  JOIN OUR DISCORD
                </div>
                <div className='join-discord-content text-justify'>
                  Do you want to be on the whitelist? Or do you want to be a
                  member of our DAO? Join our Discord to be part of the largest
                  movement ever!
                </div>
                <a href='https://discord.gg/bJ9Z87dFDp' target='_blank'>
                  <button className='join-button'>
                    <i className='fab fa-discord'></i> JOIN DISCORD
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id='roadmap' className='roadmap-section'>
          <div className='main-container'>
            <div className='col-12 text-center d-flex justify-content-center pt-30'>
              <span className='section_title gtfcduyjdc wow fadeInUp'>
                THE ROADMAP
              </span>
            </div>
            <div className='text-center font_general line-height-18 wow bounceIn pt-30'>
              Mints are subject to change to meet demand
            </div>
            <div className='row mx-0'>
              <div className='col-md-12 col-sm-12'>
                <section className='roadmap pb-5'>
                  <div className='roadmap_title_back'></div>
                  <div className='top_one container-fluid mt-5 roadmap-padding'>
                    <div className='row pb-4 mx-0 position-relative mx-0 wow fadeInUp'>
                      <div className='col-md-12'>
                        <div className='row rounded roadmap_round py-4'>
                          <div className='col-md-1 col-2 d-inline dot_data p-2'>
                            <span className='dot'></span>
                          </div>
                          <div className='col-md-11 col-10 d-inline mt-0'>
                            <div className=''>
                              <span className='top_title_num roadmap_font'>
                                {" "}
                              </span>

                              <span className='top_title line-height-18'>
                                PHASE 01 (AUG 2022)
                              </span>
                            </div>
                            <div className='font_general line-height-18'>
                              1000 NFTs ($250) will be released, 10-40 miners
                              (Ethereum Classic) depending on which model and
                              will be deployed within 15 days.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row pb-4 mx-0 position-relative mx-0 wow fadeInUp'>
                      <div className='col-md-12'>
                        <div className='row rounded roadmap_round py-4'>
                          <div className='col-md-1 col-2 d-inline dot_data p-2'>
                            <span className='dot'></span>
                          </div>
                          <div className='col-md-11 col-10 d-inline mt-0'>
                            <div className=''>
                              <span className='top_title_num roadmap_font'></span>
                              <span className='top_title line-height-18'>
                                PHASE 02 (OCT 2022)
                              </span>
                            </div>
                            <div className='font_general line-height-18'>
                              1000 NFTs ($300) will be released, 10-40 miners
                              (Litecoin - Subject to change) depending on which
                              model and will be deployed within 15 days.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row pb-4 mx-0 position-relative mx-0 wow fadeInUp'>
                      <div className='col-md-12'>
                        <div className='row rounded roadmap_round py-3'>
                          <div className='col-md-1 col-2 d-inline dot_data p-2'>
                            <span className='dot'></span>
                          </div>
                          <div className='col-md-11 col-10 d-inline mt-0'>
                            <div className=''>
                              <span className='top_title_num roadmap_font'>
                                {" "}
                              </span>
                              <span className='top_title line-height-18'>
                                PHASE 03 (JAN 2023)
                              </span>
                            </div>
                            <div className='font_general line-height-18'>
                              1000 NFTs ($350) will be, released 10-40 miners
                              (Kadena - Subject to change) depending on which
                              model and will be deployed within 15 days.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row pb-4 mx-0 position-relative mx-0 wow fadeInUp'>
                      <div className='col-md-12'>
                        <div className='row rounded roadmap_round py-4'>
                          <div className='col-md-1 col-2 d-inline dot_data p-2'>
                            <span className='dot'></span>
                          </div>
                          <div className='col-md-11 col-10 d-inline mt-0'>
                            <div className=''>
                              <span className='top_title_num roadmap_font'>
                                {" "}
                              </span>
                              <span className='top_title line-height-18'>
                                PHASE 04 (FEB 2023)
                              </span>
                            </div>
                            <div className='font_general line-height-18'>
                              1000 NFTs ($400) will be released, 10-40 miners
                              (BTC - Subject to change) depending on which model
                              and will be deployed within 15 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className='team-section' id='team'>
          <div className='main-container'>
            <div className='col-12 text-center d-flex justify-content-center wow fadeInUp'>
              <div className='section_title line-height-15'>MEET OUR TEAM</div>
            </div>
            <div className='row mx-0 my-5 team-block'>
              <div
                className='col-lg-3 col-md-6 col-sm-12 text-center wow zoomInUp my-3'
                data-wow-offset='0'>
                <img className='team-image' src='./assets/images/kenny.png' />
                <div className='team-caption'>WESTIE</div>
                <div className='team-desc'>
                  <div className='my-2'>CEO</div>
                  <div className='twitter'>Twitter</div>
                  <a className='color-white' target='_blank' href='https://twitter.com/WestieIO'>
                    @Westieio
                  </a>
                </div>
              </div>
              <div
                className='col-lg-3 col-md-6 col-sm-12 text-center wow zoomInUp my-3'
                data-wow-offset='0'>
                <img className='team-image' src='./assets/images/dxniel.png' />
                <div className='team-caption'>DXNIEL.ETH</div>
                <div className='team-desc'>
                  <div className='my-2'>CCO</div>
                  <div className='my-2'>Chief Commercial Officer</div>
                  <div className='twitter'>Twitter</div>
                  <a className='color-white' target='_blank' href='https://twitter.com/Dxniel.ETH'>
                    @Dxniel.ETH
                  </a>
                </div>
              </div>
              <div
                className='col-lg-3 col-md-6 col-sm-12 text-center wow zoomInUp my-3'
                data-wow-offset='0'>
                <img
                  className='team-image'
                  src='./assets/images/mummydumbo.png'
                />
                <div className='team-caption'>MUMMYDUMBO</div>
                <div className='team-desc'>
                  <div className='my-2'>CMO</div>
                  <div className='my-2'>Chief Marketing Officer</div>
                  <div className='off-chain'>(Off-Chain)</div>
                </div>
              </div>
              <div
                className='col-lg-3 col-md-6 col-sm-12 text-center wow zoomInUp my-3'
                data-wow-offset='0'>
                <img
                  className='team-image'
                  src='./assets/images/christine.png'
                />
                <div className='team-caption'>CHRISTINE</div>
                <div className='team-desc'>
                  <div className='my-2'>CMO</div>
                  <div className='my-2'>Chief Marketing Officer</div>
                  <div className='twitter'>Twitter</div>
                  <a className='color-white' target='_blank' href='https://twitter.com/OnlyEyes4Crypto'>
                    @OnlyEyes4Crypto
                  </a>
                </div>
              </div>
              {/* <div className="col-lg-2 col-md-6 col-sm-12 text-center wow zoomInUp" data-wow-offset="0">
								<img className="team-image" src="./assets/images/cryptodreko.png"/>
								<div className="team-caption">
									CRYPTODREKO
								</div>
								<div className="team-desc">
									<div className="my-2">Project Advisor</div>
									<div className="twitter">Twitter</div>
									<a className="color-white" target="_blank" href="">@CryptoDreko</a>
								</div>
							</div> */}
              {/* <div className="col-lg-2 col-md-6 col-sm-12 text-center wow zoomInUp" data-wow-offset="0">
								<img className="team-image" src="./assets/images/wealthdash.png"/>
								<div className="team-caption">
									WEALTHDASH
								</div>
								<div className="team-desc">
									<div className="my-2">Project Advisor</div>
									<div className="twitter">Twitter</div>
									<a className="color-white" target="_blank" href="">@dash_wealth</a>
								</div>
							</div> */}
            </div>
          </div>
        </section>

        <section className='section-qa main-container' id='faq'>
          <div className='col-12 text-center d-flex justify-content-center'>
            <span className='section_title my-0 py-0 gtfcduyjdc wow fadeInUp'>
              FAQS
            </span>
          </div>
          <div className='content container-fluid mt-md-5 mt-4 footer-padding'>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>What is DAO?</h1>
              </button>
              <div className='panel'>
                <p>
                  DAO is an organization managed by a project’s token holders
                  and governed by rules written into smart contracts and
                  deployed to the blockchain.{" "}
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>Why Ethereum?</h1>
              </button>
              <div className='panel'>
                <p>
                  Ethereum Blockchain is quickly becoming a popular choice for a
                  large number of people. Numerous cryptocurrency projects are
                  launched in the following years based on its platform and
                  ERC20 tokens.
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  When will the Minetopia NFT collection be launched and minted?
                </h1>
              </button>
              <div className='panel'>
                <p>
                  The Minetopia NFT collection is expected to be launched and
                  minted by the end of August 2022.{" "}
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  What is the expected floor price for Minetopia?{" "}
                </h1>
              </button>
              <div className='panel'>
                <p>
                  The expected floor price of the Minetopia NFT collection will
                  be announced on our Discord server shortly.{" "}
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  Where can I buy a Minetopia NFT?{" "}
                </h1>
              </button>
              <div className='panel'>
                <p>
                  You can get hold of a Minetopia NFT by visiting OpenSea or
                  directly from this page by linking your wallet.
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  What is Minetopia Vision and Mission?{" "}
                </h1>
              </button>
              <div className='panel'>
                <p>
                  Our mission is to create a realistic and sustainable reward
                  ecosystem from ASIC miners. The mined coins will be sold on
                  the market and then distributed on a monthly basis by
                  airdropping one of the selected stable coins such as USDT /
                  USDC / BUSD / DAI to the Minetopia DAO based on the
                  percentages explained in the Tokenomics section of this paper.
                  Distributions, expenses, allocations and other concerns of the
                  project will be determined by the DAO through a voting
                  process.
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>Why Minetopia? </h1>
              </button>
              <div className='panel'>
                <p>
                  Minetopia is built to provide a consistent way for loyal
                  Minetopia NFT holders to participate in the project’s growth
                  through governance, supporting proof-of-work (PoW)
                  blockchains, and subsequently receiving the mining rewards
                  associated with the mining-as-a-service protocol.
                  Additionally, the project is built with certain measures that
                  reduce the impacts of massive token selloffs.
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  MULTIPLE OPPORTUNITIES(NOT JUST LIMITED TO ONE COIN)
                </h1>
              </button>
              <div className='panel'>
                <p>
                  There are multiple options for mining tokens. Bitcoin (BTC),
                  Ethereum Classic (ETC), Kadena (KDA), and Litecoin (LTC) with
                  free Dogecoin (DOGE).
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>POTENTIAL RETURNS</h1>
              </button>
              <div className='panel'>
                <p>
                  Working with Minetopia will allow an NFT holder to receive
                  tokens from the mining-as-a-service rewards without the
                  standard large upfront capital needed to purchase a mine and
                  the expense of running/maintaining the miners themselves.
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>TRANSPARENCY</h1>
              </button>
              <div className='panel'>
                <p>
                  Our mining operation will be made 100% transparent through a
                  monthly report as well as making the wallet address accessible
                  to the DAO members within the Minetopia Discord.
                </p>
              </div>
            </div>
            {/* <div className="mt-2 accordion-container footer_round wow slideInRight">
							<button className="accordion py-1">
								<h1 className="footer-font">CRYPTO FRIENDLY IN MALAYSIA</h1>
							</button>
							<div className="panel">
								<p>Cryptocurrencies are not viewed as capital assets nor a legal tender by Malaysian authorities.</p>
							</div>
						</div>
						<div className="mt-2 accordion-container footer_round wow slideInRight">
							<button className="accordion py-1">
								<h1 className="footer-font">DISCOUNTED PRICE MINERS (BRAND NEW WITH WARRANTY)</h1>
							</button>
							<div className="panel">
								<p>Founder has full access and good connections with the first-class distributors in China. Miner price is GUARANTEED to be under the retail price.</p>
							</div>
						</div>
						<div className="mt-2 accordion-container footer_round wow slideInRight">
							<button className="accordion py-1">
								<h1 className="footer-font">FREEDOM OF CHOICE</h1>
							</button>
							<div className="panel">
								<p>A Minetopia DAO membership is directly related to the possession of at least 1 Minetopia NFT. If you wish to forfeit your stake and future mining rewards, you can simply sell your Minetopia NFT(s) and exit the DAO.</p>
							</div>
						</div> */}
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>
                  WHY IS THE HOSTING PROVIDER SELECTED IN AUSTRALIA?
                </h1>
              </button>
              <div className='panel'>
                <p>
                  The project’s CEO resides in Australia and will have easy
                  access to this facility to ensure proper management of the
                  miners
                </p>
              </div>
            </div>
            <div className='mt-2 accordion-container footer_round wow slideInRight'>
              <button className='accordion py-1'>
                <h1 className='footer-font'>TOKENOMICS</h1>
              </button>
              <div className='panel'>
                <p>
                  <div>
                    <b>The Community Wallet,</b> will share its rewards from all
                    the Minetopia NFT Phases. This allows the rewards to be
                    increasingly balanced and reliable as the Minetopia miners
                    are diversified through any future NFT Phases.
                  </div>
                  <div className='tokenomic-paragraph'>
                    <b>The Expansion Wallet,</b> will enable the DAO to compound
                    through governance. This is where 1 NFT = 1 vote comes into
                    play, what miners are potentially purchased with these funds
                    and how those tokens are managed such as holding for future
                    value.
                  </div>
                  <div className='tokenomic-paragraph'>
                    <b>The Maintenance & Team Wallet,</b> will provide the
                    necessary funds for expenses associated with up- keeping the
                    miners, development costs, and team payroll.
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className='footer-section'>
        <div className='text-center'>
          <img className='sub-trans' src='./assets/images/sub_trans.png' />
        </div>
        <div className='copyright-section text-center'>
          Copyright <i className='far fa-copyright'></i> 2022 All Rights
          Reserved by Minetopia.
        </div>
        <div className='text-center my-3'>
          <Link className='sub-item mr-3' to='/privacy' target='_blank'>
            {" "}
            Minetopia Privacy
          </Link>
          <Link className='sub-item' to='/terms-and-conditions' target='_blank'>
            {" "}
            Minetopia T&C
          </Link>
        </div>
        {/* <div className="col-lg-2 col-md-12 text-center content-center">
					<a href="https://twitter.com/MinetopiaNFT" target="_blank">
						<i className="fab fa-twitter social-icon"></i>
					</a>
					<a href="https://www.youtube.com/" target="_blank">
						<i className="fab fa-youtube social-icon"></i>
					</a>
					<a href="https://discord.gg/bJ9Z87dFDp" target="_blank">
						<i className="fab fa-discord social-icon"></i>
					</a>
				</div> */}
      </section>
    </div>
  );
}

export default Home;
