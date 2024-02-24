document.addEventListener('DOMContentLoaded', async function () {
    // Conectar a un nodo Ethereum 
    const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-api-key');

    // Dirección del contrato y ABI 
    const contractAddress = '0xYourContractAddress';
    const contractAbi = [...];  // abi

    // Crear una instancia del contrato
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Función para manejar la donación
    window.handleDonation = async function (event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const walletAddress = document.getElementById('walletAddress').value;

        // Convertir el monto unidad más pequeña en ethereum
        const amountWei = web3.utils.toWei(amount, 'ether');

        // Enviar transacción para registrar la donación en el contrato
        try {
            const txHash = await contract.methods.donate(walletAddress).send({
                from: '0xYourWalletAddress',  //dirección de tu billetera
                value: amountWei,
                gas: 100000  // catidad de pago para concretar envio
            });

            console.log('Transacción enviada, hash:', txHash);
            alert('Donación realizada con éxito.');
        } catch (error) {
            console.error('Error en la transacción:', error);
            alert('Error al realizar la donación. Consulta la consola para obtener más detalles.');
        }
    };
});