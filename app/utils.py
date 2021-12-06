from web3 import Web3
import json

w3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545'))


def create_wallet():
    account = w3.eth.account.create()
    private_key = account.privateKey.hex()
    address = account.address
    return [address, private_key]


def ganache_account():
    accounts = w3.eth.get_accounts()
    return accounts


account_ganache = ganache_account()


def set_contract():
    address_contract = ''  # insert the address contract
    with open("app/truffle/build/contracts/newCompany.json") as info:
        info_abi = json.load(info)
    abi = info_abi['abi']
    my_contract = w3.eth.contract(address=address_contract, abi=abi)
    return my_contract


contract = set_contract()


def initialize_contract():
    contract.functions.initialize().transact({'from': account_ganache[0]})


def create_nft(uri, name, price):
    sale = True
    tx_id = contract.functions.newToken(uri, name, price, sale).transact({'from': account_ganache[0]})
    return tx_id


def get_id_token_on_sale(address):
    all_token_on_sale = contract.functions.getAllOnSale().call()
    all_id = []
    for token in all_token_on_sale:
        if token[0] != 0 and token[5] != address:  # non aggiunge i token messi in vendita dallo user stesso
            all_id.append(token[0])
    return all_id


def get_all_token_user(address):
    all_token_on_sale = contract.functions.getAllTokenUser(address).call()
    all_token = []
    for token in all_token_on_sale:
        if token[0] != 0:
            all_token.append(token)
    if len(all_token) < 1:
        all_token = 0
    return all_token


def send_ether_new_user(address_user):
    quantity_ether = 1
    value = w3.toWei(quantity_ether, 'ether')
    txx = w3.eth.send_transaction({'from': account_ganache[9], 'to': address_user, 'value': value})
    return txx


def event_token_id(tx_id):
    contract = set_contract()
    tx_receipt = w3.eth.getTransactionReceipt(tx_id)
    rich_log = contract.events.Transfer().processReceipt(tx_receipt)
    event = rich_log[0]['args']
    return event['tokenId']
