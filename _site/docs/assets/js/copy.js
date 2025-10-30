(function() {
  function addCopyButtons() {
    document.querySelectorAll('div.highlight').forEach(function(block) {
      if (block.querySelector('.bb-copy-button')) return;
      var btn = document.createElement('button');
      btn.className = 'bb-copy-button';
      btn.type = 'button';
      btn.innerText = 'Copy';
      btn.addEventListener('click', function() {
        var code = block.querySelector('pre').innerText;
        navigator.clipboard.writeText(code).then(function() {
          btn.innerText = 'Copied!';
          setTimeout(function(){ btn.innerText = 'Copy'; }, 1500);
        });
      });
      block.style.position = 'relative';
      btn.style.position = 'absolute';
      btn.style.top = '6px';
      btn.style.right = '6px';
      block.appendChild(btn);
    });
  }
  document.addEventListener('DOMContentLoaded', addCopyButtons);
})();
