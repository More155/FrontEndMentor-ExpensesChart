document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('data.json');
  const data = await response.json();

  const maxAmount = Math.max(...data.map(item => item.amount));

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  document.querySelectorAll('.bar').forEach(bar => {
    const classes = bar.classList; 
    const dayClass = [...classes].find(cls => cls !== 'bar'); 

    const dayData = data.find(item => item.day === dayClass);
    
    if (!dayData) return;

    const amount = dayData.amount;

    const heightPercentage = (amount / maxAmount) * 100;
    bar.style.height = `${heightPercentage}%`;

    if (amount === maxAmount) {
      bar.classList.add('highest');
    }

    bar.addEventListener('mouseenter', () => {
      tooltip.textContent = `$${amount.toFixed(2)}`;
      tooltip.style.display = 'block';
    });

    bar.addEventListener('mousemove', e => {
      const rect = tooltip.getBoundingClientRect();
      let left = e.clientX - rect.width / 2;
      let top = e.clientY - rect.height - 16;

      left = Math.max(10, Math.min(left, window.innerWidth - rect.width - 10));
      top = Math.max(10, top);

      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    });

    bar.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
});