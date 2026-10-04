// Store button link — غيّر اللينك هنا وبس لو عايز توديه مكان تاني
var STORE_LINK = 'https://store.epicgames.com/';
function openStore(){
  window.open(STORE_LINK, '_blank');
}

function copyFortniteCode(cardEl){
  var code = 'SHR67';
  var ctaText = cardEl.querySelector('[data-role="cta-text"]');
  var ctaIcon = cardEl.querySelector('[data-role="cta-icon"]');
  if(!ctaText) return;

  function showCopied(){
    var originalText = ctaText.textContent;
    var originalIcon = ctaIcon ? ctaIcon.innerHTML : null;
    ctaText.textContent = 'Copied!';
    if(ctaIcon){
      ctaIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
    }
    cardEl.classList.add('code-copied');
    setTimeout(function(){
      ctaText.textContent = originalText;
      if(ctaIcon && originalIcon){ ctaIcon.innerHTML = originalIcon; }
      cardEl.classList.remove('code-copied');
    }, 1600);
  }

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(code).then(showCopied).catch(function(){
      fallbackCopy(code, showCopied);
    });
  } else {
    fallbackCopy(code, showCopied);
  }
}

function fallbackCopy(text, cb){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  document.body.removeChild(ta);
  if(cb) cb();
}

var isSwitching = false;
function showPage(id){
  var current = document.querySelector('.page.active');
  if(current && current.id === id){ return; }
  if(isSwitching){ return; }
  isSwitching = true;

  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  var target = document.getElementById(id);
  target.classList.add('active');

  document.querySelectorAll('.navlinks a').forEach(function(a){ a.classList.remove('active'); });
  var link = document.querySelector('.navlinks a[data-page="' + id + '"]');
  if(link){ link.classList.add('active'); }

  document.querySelector('.scroll-container').scrollTo({top:0, behavior:'smooth'});
  setTimeout(function(){ isSwitching = false; }, 350);
}
