async function postJSON(path, data){ 
  const res = await fetch(path, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});
  return res.json();
}

function readInputs(){
  return {
    scenario_name: document.getElementById('scenario_name').value,
    monthly_invoice_volume: parseFloat(document.getElementById('monthly_invoice_volume').value) || 0,
    num_ap_staff: parseFloat(document.getElementById('num_ap_staff').value) || 0,
    avg_hours_per_invoice: parseFloat(document.getElementById('avg_hours_per_invoice').value) || 0,
    hourly_wage: parseFloat(document.getElementById('hourly_wage').value) || 0,
    error_rate_manual: parseFloat(document.getElementById('error_rate_manual').value) || 0,
    error_cost: parseFloat(document.getElementById('error_cost').value) || 0,
    time_horizon_months: parseInt(document.getElementById('time_horizon_months').value) || 36,
    one_time_implementation_cost: parseFloat(document.getElementById('one_time_implementation_cost').value) || 0
  };
}

document.getElementById('simulate').addEventListener('click', async ()=>{
  const data = readInputs();
  const res = await postJSON('/simulate', data);
  document.getElementById('result_json').textContent = JSON.stringify(res.result, null, 2);
  document.getElementById('report_card').style.display = 'block';
});

document.getElementById('save').addEventListener('click', async ()=>{
  const data = readInputs();
  const res = await postJSON('/scenarios', data);
  alert('Saved scenario id: '+res.id);
  loadScenarios();
});

async function loadScenarios(){
  const res = await fetch('/scenarios');
  const json = await res.json();
  const ul = document.getElementById('scenario_list');
  ul.innerHTML = '';
  json.scenarios.forEach(s=>{
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = `${s.name} (id:${s.id})`;
    a.onclick = async ()=>{
      const resp = await fetch('/scenarios/'+s.id);
      const d = await resp.json();
      const payload = d.scenario.payload;
      // populate fields
      document.getElementById('scenario_name').value = payload.scenario_name || '';
      document.getElementById('monthly_invoice_volume').value = payload.monthly_invoice_volume || 0;
      document.getElementById('num_ap_staff').value = payload.num_ap_staff || 0;
      document.getElementById('avg_hours_per_invoice').value = payload.avg_hours_per_invoice || 0;
      document.getElementById('hourly_wage').value = payload.hourly_wage || 0;
      document.getElementById('error_rate_manual').value = payload.error_rate_manual || 0;
      document.getElementById('error_cost').value = payload.error_cost || 0;
      document.getElementById('time_horizon_months').value = payload.time_horizon_months || 36;
      document.getElementById('one_time_implementation_cost').value = payload.one_time_implementation_cost || 0;
      document.getElementById('simulate').click();
    };
    li.appendChild(a);
    ul.appendChild(li);
  });
}

document.getElementById('generate').addEventListener('click', async ()=>{
  const email = document.getElementById('lead_email').value;
  if(!email){ alert('Please enter email in the report card below first.'); return; }
  const scenario = readInputs();
  const res = await postJSON('/report/generate', {email, scenario});
  if(res.success){
    const path = res.report_path.replace('reports/','');
    document.getElementById('report_link').innerHTML = `<a href="/reports/${path}" target="_blank">Download report</a>`;
    alert('Report generated. Use the link to download.');
  } else {
    alert('Error: '+(res.error||'unknown'));
  }
});

document.getElementById('download_report').addEventListener('click', ()=>{
  // placeholder if user wants direct download after generation
  const link = document.querySelector('#report_link a');
  if(link) window.open(link.href, '_blank');
  else alert('Generate a report first.');
});

// load on start
loadScenarios();
