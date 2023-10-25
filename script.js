document.getElementById('calculo-selecionado').addEventListener('change', function() {
    const selectedCalculation = this.value;
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Limpa os campos de entrada anteriores

    if (selectedCalculation === 'capacidade-canal') {
        inputsDiv.innerHTML = `
            <label for="largura-banda">Largura de Banda (Hz):</label>
            <input type="number" id="largura-banda" required><br>
            <label for="snr-db">Relação Sinal-Ruído (dB):</label>
            <input type="number" id="snr-db" required><br>
        `;
    } else if (selectedCalculation === 'taxa-nyquist') {
        inputsDiv.innerHTML = `
            <label for="largura-banda">Largura de Banda do Sinal (Hz):</label>
            <input type="number" id="largura-banda" required><br>
            <label for="modulation">Modulação Multinível:</label>
            <input type="number" id="modulation" required><br>
        `;
    } else if (selectedCalculation === 'mw-dbm') {
        inputsDiv.innerHTML = `
            <label for="mwdbm">Potência (mW):</label>
            <input type="number" id="mwdbm" required><br>
        `;
    } else if (selectedCalculation === 'dbm-mw') {
        inputsDiv.innerHTML = `
            <label for="dbmmw">Decibéis-Milliwatts (dBm):</label>
            <input type="number" id="dbmmw" required><br>
        `;
    } else if (selectedCalculation === 'eirp') {
        inputsDiv.innerHTML = `
            <label for="potencia">Potência de Transmissão (dBm):</label>
            <input type="number" id="potencia" required><br>
            <label for="ganho-antena">Ganho da Antena (dBi):</label>
            <input type="number" id="ganho-antena" required><br>
            <label for="perda-cabo">Perdas no Cabo (dB):</label>
            <input type="number" id="perda-cabo" required><br>
        `;
    } else if (selectedCalculation === 'fslp') {
        inputsDiv.innerHTML = `
            <label for="distancia">Distância (Km):</label><br> 
            <input type="number" id="distancia" required><br>
            <label for="frequencia">Frequência (MHz):</label>
            <input type="number" id="frequencia" required><br>
        `;
    } else if (selectedCalculation === 'rsl') {
        inputsDiv.innerHTML = `
            <label for="potencia">Potência de Transmissão (dBm):</label>
            <input type="number" id="potencia" required><br>
            <label for="ganho-antena-tx">Ganho da Antena TX (dBi):</label>
            <input type="number" id="ganho-antena-tx" required><br>
            <label for="perda-cabo-tx">Perdas no Cabo TX (dB):</label>
            <input type="number" id="perda-cabo-tx" required><br>
            <label for="fslp">Free Space Loss Path:</label>
            <input type="number" id="fslp" required><br>
            <label for="ganho-antena-rx">Ganho da Antena RX (dBi):</label>
            <input type="number" id="ganho-antena-rx" required><br>
            <label for="perda-cabo-rx">Perdas no Cabo RX (dB):</label>
            <input type="number" id="perda-cabo-rx" required><br>
        `;
    } else if (selectedCalculation === 'fresnel-zone') {
        inputsDiv.innerHTML = `
            <label for="distancia-total">Distância total (Km):</label>
            <input type="number" id="distancia-total" required><br>
            <label for="distancia-objeto">Distância até o objeto (Km):</label>
            <input type="number" id="distancia-objeto" required><br>
            <label for="frequencia">Frequência (MHz):</label>
            <input type="number" id="frequencia" required><br>
        `;
    }

    // Limpe o resultado anterior e esconda-o
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('resultado-text').textContent = '';
    document.getElementById('formula-text').textContent = '';
});
const form = document.getElementById('calculator-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
})
document.getElementById('calcular').addEventListener('click', function() {
    const selectedCalculation = document.getElementById('calculo-selecionado').value;
    const inputs = document.getElementById('inputs');
    const formulaText = document.getElementById('formula-text');

    if (selectedCalculation === 'capacidade-canal') {
        const larguraBanda = parseFloat(document.getElementById('largura-banda').value);
        const snrDb = parseFloat(document.getElementById('snr-db').value);
        const capacidadeCanal = larguraBanda * Math.log2(1 + Math.pow(10, snrDb / 10));
        const formula = `Capacidade Máxima de Canal (Shannon): Capacidade (bps) = ${larguraBanda}Hz * log2(1 + 10^(${snrDb}dB /10)`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${capacidadeCanal} bps`;
    } else if (selectedCalculation === 'taxa-nyquist') {
        const larguraBanda = parseFloat(document.getElementById('largura-banda').value);
        const modulation = parseFloat(document.getElementById('modulation').value);
        const taxaNyquist = 2 * larguraBanda * modulation;
        const formula = `Taxa de Nyquist: Taxa (bps) = 2 * ${larguraBanda} * ${modulation}`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${taxaNyquist} bps`;
    } 
    else if (selectedCalculation === 'mw-dbm') {
        const miliwattsDbm = parseFloat(document.getElementById('mwdbm').value);
        const conversaoMwDbm = 10 * Math.log10(miliwattsDbm);
        const formula = `Conversão de mW para dBm: Potência (dBm) = 10 * log10( ${miliwattsDbm})`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${conversaoMwDbm} dBm`;
    }
    else if (selectedCalculation === 'dbm-mw') {
        const dbmMiliwatts = parseFloat(document.getElementById('dbmmw').value);
        const convesaoDbmMw = Math.pow(10, dbmMiliwatts/10);
        const formula = `Conversão de dBm para mW: Potência (mW) = 10^(${dbmMiliwatts} / 10)`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${convesaoDbmMw} Mw`;
    }
    else if (selectedCalculation === 'eirp') {
        const potencia = parseFloat(document.getElementById('potencia').value);
        const ganhoAntena = parseFloat(document.getElementById('ganho-antena').value);
        const perdaCabo = parseFloat(document.getElementById('perda-cabo').value);
        const eirp = potencia + ganhoAntena - perdaCabo;
        const formula = `EIRP (Effective Isotropic Radiated Power): EIRP (dBm) = ${potencia} + ${ganhoAntena} - ${perdaCabo}`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${eirp} dBm`;
    }
    else if (selectedCalculation === 'fslp') {
        const distancia = parseFloat(document.getElementById('distancia').value);
        const frequencia = parseFloat(document.getElementById('frequencia').value);
        const fslp = 32.4 + 20 * Math.log10(distancia) + 20 * Math.log10(frequencia);
        const formula = `FSLP (Free Space Loss Path): FSLP (dB) = 32,4 + 20 * log10(${distancia}) + 20 * log10(${frequencia})`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${fslp} dB`;
    }
    else if (selectedCalculation === 'rsl') {
        const potencia = parseFloat(document.getElementById('potencia').value);
        const ganhoAntenaTx = parseFloat(document.getElementById('ganho-antena-tx').value);
        const perdaCaboTx = parseFloat(document.getElementById('perda-cabo-tx').value);
        const fslp = parseFloat(document.getElementById('fslp').value);
        const ganhoAntenaRx = parseFloat(document.getElementById('ganho-antena-rx').value);
        const perdaCaboRx = parseFloat(document.getElementById('perda-cabo-rx').value);
        const rsl = potencia + ganhoAntenaTx - perdaCaboTx - fslp + ganhoAntenaRx - perdaCaboRx;
        const formula = `RSL (Received Signal Level): RSL (dBm) = ${potencia} + ${ganhoAntenaTx} - ${perdaCaboTx} - ${fslp} + ${ganhoAntenaRx} - ${perdaCaboRx}`;
        formulaText.textContent = formula;
        document.getElementById('resultado-text').textContent = `Resultado: ${rsl} dBm`;
    }
    else if (selectedCalculation === 'fresnel-zone') {
        const distanciaTotal = parseFloat(document.getElementById('distancia-total').value);
        const distanciaObjeto = parseFloat(document.getElementById('distancia-objeto').value);
        const frequencia = parseFloat(document.getElementById('frequencia').value);
        const distanciaRestoObjeto = distanciaTotal - distanciaObjeto;
        const fresnel = 550 * Math.sqrt((distanciaObjeto * distanciaRestoObjeto) / (distanciaTotal * frequencia));
        const formula = `Raio da zona de Fresnel (m) = 550 * √(${distanciaObjeto} * ${distanciaRestoObjeto}) / ( ${distanciaTotal} * ${frequencia} ))`;
        
        if (frequencia < 3000) {
            const percMin = fresnel * 0.6;
            const formMin = `\\n${fresnel.toFixed(2)} * 0,6`;
            formMinForm = formMin.replace(/\\n/g, '\n');
            formulaText.textContent = formula + formMinForm;
            document.getElementById('resultado-text').textCfiontent = `Resultado: ${fresnel.toFixed(2)} m; Raio com aplicação do percentual mínimo: ${percMin.toFixed(2)} m`;
        }else{
            formulaText.textContent = formula;
            document.getElementById('resultado-text').textContent = `Resultado: ${fresnel.toFixed(2)} m`;
        }
    }

    // Exiba o resultado
    document.getElementById('resultado').style.display = 'block';
    
});
