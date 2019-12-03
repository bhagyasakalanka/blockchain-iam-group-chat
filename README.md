# blockchain-iam-group-chat
An implementation of blockchain identity and access management (IAM) architecture pattern. This project extends the challenge response authentication based group chat application described in [1][2]. This project depends on [3] for some custom extensions developed for Ballerina.

## How to run
This application requires Ballerina 1.0.3 version which is available from [4]. Before running this project, ballerina-eth-utils project needs to be built and the libraries produced by ballerina-eth-utils project needs to be copied to the appropriate paths following the guidelines in [5]. You need to have an Ethereum blockchain and a MySQL server for running this application. For setting up the blockchain cluster you may refer the instructions provided in [6][7]. You need to setup the MySQL DB using the db.sql script. Once these setup are completed you need to execute run.sh script to run this system.


[1] https://medium.com/@miyurud/challenge-response-protocol-based-authentication-with-blockchains-2935bf6c53d4

[2] https://github.com/miyurud/group-chat-blockchain

[3] https://github.com/miyurud/ballerina-eth-utils

[4] https://ballerina.io/downloads/archived/

[5] https://medium.com/ballerina-techblog/plug-custom-native-functions-to-ballerina-5bbc2e15b6ac

[6] https://ethereum.gitbooks.io/frontier-guide/content/cluster.html

[7] https://medium.com/@niceoneallround/creating-a-private-ethereum-network-on-a-mac-c417ab971055
