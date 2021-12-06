// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract newCompany is ERC721Upgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    mapping (uint256 => TokenMeta) private _tokenMeta;

    string baseURI;

    struct TokenMeta {
        uint256 id;
        uint256 price;
        string name;
        string uri;
        bool sale;
        address user;
    }


    function initialize() public initializer {
        OwnableUpgradeable.__Ownable_init();
        ReentrancyGuardUpgradeable.__ReentrancyGuard_init();
        ERC721Upgradeable.__ERC721_init("COMPANY", "CMP ");
        setBaseURI("your uri");
    }


    function _baseURI() internal view override virtual returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public virtual onlyOwner {
        baseURI = _newBaseURI;
    }

    function getAllOnSale () public view virtual returns( TokenMeta[] memory ) {
        TokenMeta[] memory tokensOnSale = new TokenMeta[](_tokenIds.current());
        uint256 counter = 0;

        for(uint i = 1; i < _tokenIds.current() + 1; i++) {
            if(_tokenMeta[i].sale == true) {
                tokensOnSale[counter] = _tokenMeta[i];
                counter++;
            }
        }
        return tokensOnSale;
    }


    function getAllTokenUser (address user) public view virtual returns( TokenMeta[] memory ) {
        TokenMeta[] memory tokensOfUser = new TokenMeta[](_tokenIds.current());
        uint256 counter = 0;

        for(uint i = 1; i < _tokenIds.current() + 1; i++) {
            if(_tokenMeta[i].user == user) {
                tokensOfUser[counter] = _tokenMeta[i];
                counter++;
            }
        }
        return tokensOfUser;
    }


    function tokenSale(uint256 tokenId) public view virtual returns (bool) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenMeta[tokenId].sale;
    }

    /**
     * Requirements:
     * `tokenId` must exist
     * `price` must be more than 0
     * `owner` must the msg.owner
     */
    function setTokenSale(uint256 _tokenId, bool _sale, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Sale set of nonexistent token");
        require(_price > 0);
        require(ownerOf(_tokenId) == _msgSender());

        _tokenMeta[_tokenId].sale = _sale;
        setTokenPrice(_tokenId, _price);
    }

    /**
     * Requirements:
     * `tokenId` must exist
     * `owner` must the msg.owner
     */
    function setTokenPrice(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Price set of nonexistent token");
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId].price = _price;
    }

    function tokenPrice(uint256 tokenId) public view virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenMeta[tokenId].price;
    }

    /**
     * @dev sets token meta
     * @param _tokenId uint256 token ID (token number)
     * @param _meta TokenMeta
     *
     * Requirements:
     * `tokenId` must exist
     * `owner` must the msg.owner
     */
    function _setTokenMeta(uint256 _tokenId, TokenMeta memory _meta) private {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId] = _meta;
    }

    function tokenMeta(uint256 _tokenId) public view returns (TokenMeta memory) {
        require(_exists(_tokenId));
        return _tokenMeta[_tokenId];
    }


    function purchaseToken(uint256 _tokenId) public payable nonReentrant {
        require(msg.sender != address(0) && msg.sender != ownerOf(_tokenId));
        require(msg.value >= _tokenMeta[_tokenId].price);
        require(_tokenMeta[_tokenId].sale, "Token isn't on sale");
        address  tokenSeller = ownerOf(_tokenId);

        payable(tokenSeller).transfer(msg.value);

        setApprovalForAll(tokenSeller, true);
        _transfer(tokenSeller, msg.sender, _tokenId);
        _tokenMeta[_tokenId].sale = false;
        _tokenMeta[_tokenId].user = msg.sender;
    }

    function newToken(
        string memory _tokenURI,
        string memory _name,
        uint256 _price,
        bool _sale
    )
        public
        onlyOwner
        returns (uint256)
    {
        require(_price > 0);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        TokenMeta memory meta = TokenMeta(newItemId, _price, _name, _tokenURI, _sale, msg.sender);
        _setTokenMeta(newItemId, meta);


        return newItemId;
    }

    function giftToken(uint256 idToken, address user) public {
        require(ownerOf(idToken) == msg.sender, "Not authorized");
        _transfer(msg.sender, user, idToken);
        _tokenMeta[idToken].user = user;
        _tokenMeta[idToken].sale = false;

    }
}