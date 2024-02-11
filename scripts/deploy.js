
const hrdhat = require("hardhat");

async function startFunction() {
  const home = await hrdhat.ethers.getContractFactory("HomeSecuritySystem");
  const HomeSecurity = await home.deploy();
  await HomeSecurity.deployed();

}


startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
