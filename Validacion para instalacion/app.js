// InstalaCheck - Refactored 3-Step Wizard Flow with Splitter Custom Logic

document.addEventListener('DOMContentLoaded', () => {
    // Current step state (only 3 steps now!)
    let currentStep = 1;
    const totalSteps = 3;
    
    // UI Steps
    const steps = {
        1: document.getElementById('step-1-content'),
        2: document.getElementById('step-2-content'),
        3: document.getElementById('step-3-content')
    };
    
    // UI Navigation
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const stepTitle = document.getElementById('step-title');
    const themeBtn = document.getElementById('theme-btn');
    
    // Step indicators
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepConnectors = document.querySelectorAll('.step-connector');
    
    // Form element
    const valForm = document.getElementById('val-form');
    
    // STEP 1 Elements
    const serviceRadioGroup = document.getElementsByName('service-type');
    
    // STEP 2 Elements - Internet
    const specInternetContainer = document.getElementById('spec-internet-container');
    const speedSelect = document.getElementById('internet-speed');
    const floorSelect = document.getElementById('router-floor');
    const chkRepeater = document.getElementById('chk-repeater');
    const utpCableContainer = document.getElementById('utp-cable-container');
    const chkUtpCable = document.getElementById('chk-utp-cable');
    
    // STEP 2 Elements - TV
    const specTvContainer = document.getElementById('spec-tv-container');
    const tvCountVal = document.getElementById('tv-count-val');
    const tvMinus = document.getElementById('tv-minus');
    const tvPlus = document.getElementById('tv-plus');
    
    const tvDigVal = document.getElementById('tv-dig-val');
    const tvDigMinus = document.getElementById('tv-dig-minus');
    const tvDigPlus = document.getElementById('tv-dig-plus');
    
    const tvAnaVal = document.getElementById('tv-ana-val');
    const tvAnaMinus = document.getElementById('tv-ana-minus');
    const tvAnaPlus = document.getElementById('tv-ana-plus');
    
    const decoWarningBox = document.getElementById('deco-warning-box');
    const decoBuyContainer = document.getElementById('deco-buy-container');
    const chkBuyDecos = document.getElementById('chk-buy-decos');
    const decoCountContainer = document.getElementById('deco-count-container');
    const decoCountVal = document.getElementById('deco-count-val');
    const decoMinusBtn = document.getElementById('deco-minus');
    const decoPlusBtn = document.getElementById('deco-plus');
    
    // STEP 2 Elements - Splitters (Refactored details)
    const splitterPortsSelect = document.getElementById('splitter-ports');
    const splitterDetailsContainer = document.getElementById('splitter-details-container');
    const splitterWarningBox = document.getElementById('splitter-warning-box');
    const splitterAmplifierBox = document.getElementById('splitter-amplifier-box');
    
    const multipleSplittersContainer = document.getElementById('multiple-splitters-container');
    const chkMultipleSplitters = document.getElementById('chk-multiple-splitters');
    const multipleSplittersWarningBox = document.getElementById('multiple-splitters-warning-box');
    const chkCoaxialCable = document.getElementById('chk-coaxial-cable');
    
    // STEP 3 Elements (Summary & Results)
    const resultStatusBadge = document.getElementById('result-status-badge');
    const resultBadgeIcon = document.getElementById('result-badge-icon');
    const resultStatusTitle = document.getElementById('result-status-title');
    const resultStatusDesc = document.getElementById('result-status-desc');
    const checklistResultsList = document.getElementById('checklist-results-list');
    
    // Summary table fields
    const summaryName = document.getElementById('summary-name');
    const summaryDni = document.getElementById('summary-dni');
    const summaryPhone = document.getElementById('summary-phone');
    const summaryAddress = document.getElementById('summary-address');
    const summaryService = document.getElementById('summary-service');
    const summaryInternetSpec = document.getElementById('summary-internet-spec');
    const summaryInternetRow = document.getElementById('summary-internet-spec-row');
    const summaryTvSpec = document.getElementById('summary-tv-spec');
    const summaryTvRow = document.getElementById('summary-tv-spec-row');
    const summaryEquip = document.getElementById('summary-equip');
    
    // Actions
    const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
    const btnPrintReport = document.getElementById('btn-print-report');
    
    // TV counts track variables
    let tvDigitalQty = 2;
    let tvAnalogQty = 0;
    let decoQtyRequested = 1;
    
    // --- Theme Control ---
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    } else {
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
    
    themeBtn.addEventListener('click', toggleTheme);
    
    function toggleTheme() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    }
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        } else {
            themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        }
    }
    
    // --- Step Navigation Control ---
    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            goToStep(currentStep + 1);
        }
    });
    
    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });
    
    function validateStep(step) {
        if (step === 1) {
            const titularName = document.getElementById('titular-name');
            const titularDni = document.getElementById('titular-dni');
            const titularPhone = document.getElementById('titular-phone');
            const titularAddress = document.getElementById('titular-address');
            
            if (!titularName.value.trim()) {
                alert("Por favor, ingrese el nombre del titular.");
                titularName.focus();
                return false;
            }
            if (!titularDni.value.trim() || !/^\d{8,10}$/.test(titularDni.value.trim())) {
                alert("Por favor, ingrese un DNI de 8 a 10 dígitos.");
                titularDni.focus();
                return false;
            }
            if (!titularPhone.value.trim()) {
                alert("Por favor, ingrese el número de contacto.");
                titularPhone.focus();
                return false;
            }
            if (!titularAddress.value.trim()) {
                alert("Por favor, ingrese la dirección de instalación.");
                titularAddress.focus();
                return false;
            }
        } else if (step === 2) {
            const service = getSelectedService();
            if (service === 'tv' || service === 'duo') {
                const total = tvDigitalQty + tvAnalogQty;
                if (total === 0) {
                    alert("Para el servicio de TV, la cantidad total de televisores debe ser al menos 1.");
                    return false;
                }
            }
        }
        return true;
    }
    
    function goToStep(step) {
        Object.keys(steps).forEach(k => {
            if (parseInt(k) === step) {
                steps[k].classList.add('active');
            } else {
                steps[k].classList.remove('active');
            }
        });
        
        stepIndicators.forEach(ind => {
            const idx = parseInt(ind.getAttribute('data-step'));
            ind.classList.remove('active', 'complete');
            if (idx === step) {
                ind.classList.add('active');
            } else if (idx < step) {
                ind.classList.add('complete');
            }
        });
        
        stepConnectors.forEach((conn, index) => {
            conn.classList.remove('complete');
            if (index + 1 < step) {
                conn.classList.add('complete');
            }
        });
        
        currentStep = step;
        
        btnPrev.disabled = currentStep === 1;
        
        if (currentStep === totalSteps) {
            calculateValidationResults();
            btnNext.innerHTML = `Terminar <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            stepTitle.textContent = "Paso 3: Resultado de Factibilidad";
        } else {
            btnNext.innerHTML = `Siguiente <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            
            if (currentStep === 1) {
                stepTitle.textContent = "Paso 1: Datos y Servicio";
            } else if (currentStep === 2) {
                stepTitle.textContent = "Paso 2: Especificaciones del Servicio";
            }
        }
        
        document.querySelector('.main-content').scrollTop = 0;
    }
    
    // Reset wizard
    btnNext.addEventListener('click', () => {
        if (currentStep === totalSteps) {
            if (confirm("¿Desea reiniciar el formulario para realizar una nueva validación?")) {
                valForm.reset();
                tvDigitalQty = 2;
                tvAnalogQty = 0;
                decoQtyRequested = 1;
                updateTVCountersUI();
                adjustStep2Containers();
                handleSplitterVisibility();
                handleMultipleSplittersWarning();
                goToStep(1);
            }
        }
    });
    
    // --- STEP 1 Type changes ---
    serviceRadioGroup.forEach(radio => {
        radio.addEventListener('change', () => {
            adjustStep2Containers();
        });
    });
    
    function getSelectedService() {
        let selected = 'duo';
        serviceRadioGroup.forEach(radio => {
            if (radio.checked) selected = radio.value;
        });
        return selected;
    }
    
    function adjustStep2Containers() {
        const service = getSelectedService();
        if (service === 'internet') {
            specInternetContainer.classList.remove('hidden');
            specTvContainer.classList.add('hidden');
        } else if (service === 'tv') {
            specInternetContainer.classList.add('hidden');
            specTvContainer.classList.remove('hidden');
        } else { // Duo
            specInternetContainer.classList.remove('hidden');
            specTvContainer.classList.remove('hidden');
        }
    }
    
    // --- STEP 2: Internet actions ---
    chkRepeater.addEventListener('change', (e) => {
        if (e.target.checked) {
            utpCableContainer.classList.remove('hidden');
        } else {
            utpCableContainer.classList.add('hidden');
            chkUtpCable.checked = false;
        }
    });
    
    // --- STEP 2: TV actions (Counters & Decos) ---
    function updateTVCountersUI() {
        const total = tvDigitalQty + tvAnalogQty;
        tvCountVal.textContent = total;
        tvDigVal.textContent = tvDigitalQty;
        tvAnaVal.textContent = tvAnalogQty;
        
        if (tvAnalogQty > 0) {
            decoWarningBox.classList.remove('hidden');
            decoBuyContainer.classList.remove('hidden');
            if (chkBuyDecos.checked) {
                decoCountContainer.classList.remove('hidden');
                if (decoQtyRequested > tvAnalogQty) {
                    decoQtyRequested = tvAnalogQty;
                }
                decoCountVal.textContent = decoQtyRequested;
            } else {
                decoCountContainer.classList.add('hidden');
            }
        } else {
            decoWarningBox.classList.add('hidden');
            decoBuyContainer.classList.add('hidden');
            decoCountContainer.classList.add('hidden');
            chkBuyDecos.checked = false;
        }
    }
    
    tvDigPlus.addEventListener('click', () => { if (tvDigitalQty < 10) { tvDigitalQty++; updateTVCountersUI(); } });
    tvDigMinus.addEventListener('click', () => { if (tvDigitalQty > 0) { tvDigitalQty--; updateTVCountersUI(); } });
    
    tvAnaPlus.addEventListener('click', () => { if (tvAnalogQty < 10) { tvAnalogQty++; updateTVCountersUI(); } });
    tvAnaMinus.addEventListener('click', () => { if (tvAnalogQty > 0) { tvAnalogQty--; updateTVCountersUI(); } });
    
    tvPlus.addEventListener('click', () => { if (tvDigitalQty + tvAnalogQty < 15) { tvDigitalQty++; updateTVCountersUI(); } });
    tvMinus.addEventListener('click', () => {
        const total = tvDigitalQty + tvAnalogQty;
        if (total > 1) {
            if (tvDigitalQty > 0) tvDigitalQty--;
            else tvAnalogQty--;
            updateTVCountersUI();
        }
    });
    
    chkBuyDecos.addEventListener('change', (e) => {
        if (e.target.checked) {
            decoCountContainer.classList.remove('hidden');
            decoQtyRequested = Math.min(1, tvAnalogQty);
            decoCountVal.textContent = decoQtyRequested;
        } else {
            decoCountContainer.classList.add('hidden');
        }
    });
    
    decoPlusBtn.addEventListener('click', () => {
        if (decoQtyRequested < tvAnalogQty) {
            decoQtyRequested++;
            decoCountVal.textContent = decoQtyRequested;
        }
    });
    decoMinusBtn.addEventListener('click', () => {
        if (decoQtyRequested > 1) {
            decoQtyRequested--;
            decoCountVal.textContent = decoQtyRequested;
        }
    });
    
    // --- STEP 2: Refactored Splitter Controls Logic ---
    
    splitterPortsSelect.addEventListener('change', handleSplitterVisibility);
    chkMultipleSplitters.addEventListener('change', handleMultipleSplittersWarning);
    
    // Listeners for Splitter Category and Condition changes to update warning live
    document.getElementsByName('splitter-cat').forEach(radio => {
        radio.addEventListener('change', evaluateFormSplitterWarning);
    });
    document.getElementsByName('splitter-cond').forEach(radio => {
        radio.addEventListener('change', evaluateFormSplitterWarning);
    });
    
    function handleSplitterVisibility() {
        const ports = splitterPortsSelect.value;
        
        if (ports === 'none') {
            splitterDetailsContainer.classList.add('hidden');
            splitterAmplifierBox.classList.add('hidden');
            splitterWarningBox.classList.add('hidden');
            // Hide and clean up multiple splitters check
            multipleSplittersContainer.classList.add('hidden');
            chkMultipleSplitters.checked = false;
            handleMultipleSplittersWarning();
        } else if (ports === 'more') {
            splitterDetailsContainer.classList.add('hidden');
            splitterAmplifierBox.classList.remove('hidden');
            splitterWarningBox.classList.add('hidden');
            // Show multiple splitters check
            multipleSplittersContainer.classList.remove('hidden');
        } else {
            // Splitter with 2, 3, or 4 outputs
            splitterDetailsContainer.classList.remove('hidden');
            splitterAmplifierBox.classList.add('hidden');
            // Show multiple splitters check
            multipleSplittersContainer.classList.remove('hidden');
            evaluateFormSplitterWarning();
        }
    }
    
    function evaluateFormSplitterWarning() {
        const catRadio = document.querySelector('input[name="splitter-cat"]:checked');
        const condRadio = document.querySelector('input[name="splitter-cond"]:checked');
        const cat = catRadio ? catRadio.value : 'quality';
        const cond = condRadio ? condRadio.value : 'good';
        
        // Show warning if splitter is basic or in bad condition
        if (cat === 'basic' || cond === 'bad') {
            splitterWarningBox.classList.remove('hidden');
        } else {
            splitterWarningBox.classList.add('hidden');
        }
    }
    
    function handleMultipleSplittersWarning() {
        if (chkMultipleSplitters.checked) {
            multipleSplittersWarningBox.classList.remove('hidden');
        } else {
            multipleSplittersWarningBox.classList.add('hidden');
        }
    }
    
    // Initialize splitters UI on start (since default in HTML is 4 ports, it should display multiple splitters check)
    handleSplitterVisibility();
    
    // --- STEP 3: Results & Rules Engine ---
    function calculateValidationResults() {
        // Collect form data
        const titularName = document.getElementById('titular-name').value.trim();
        const titularDni = document.getElementById('titular-dni').value.trim();
        const titularPhone = document.getElementById('titular-phone').value.trim();
        const titularAddress = document.getElementById('titular-address').value.trim();
        const service = getSelectedService();
        
        const speed = speedSelect.value;
        const floor = floorSelect.value;
        const hasRepeater = chkRepeater.checked;
        const needUtp = chkUtpCable.checked;
        
        const totalTvs = tvDigitalQty + tvAnalogQty;
        const splitterPorts = splitterPortsSelect.value;
        
        const hasMultipleSplitters = chkMultipleSplitters.checked;
        const needCoaxial = chkCoaxialCable.checked;
        
        // --- Populate Details Table ---
        summaryName.textContent = titularName;
        summaryDni.textContent = titularDni;
        summaryPhone.textContent = titularPhone;
        summaryAddress.textContent = titularAddress;
        
        let serviceStr = "Duo (Internet + TV)";
        if (service === 'internet') serviceStr = "Solo Internet";
        if (service === 'tv') serviceStr = "Solo TV";
        summaryService.textContent = serviceStr;
        
        // Render internet specs
        if (service === 'tv') {
            summaryInternetRow.classList.add('hidden');
        } else {
            summaryInternetRow.classList.remove('hidden');
            let repStr = hasRepeater ? `Sí (${needUtp ? 'Con UTP extra' : 'Sin UTP extra'})` : 'No';
            summaryInternetSpec.textContent = `${speed} Mbps - ${floor} - Repetidor: ${repStr}`;
        }
        
        // Render TV specs
        if (service === 'internet') {
            summaryTvRow.classList.add('hidden');
        } else {
            summaryTvRow.classList.remove('hidden');
            let splitterPortText = 'Sin Splitter';
            if (splitterPorts === '2') splitterPortText = '2 salidas';
            if (splitterPorts === '3') splitterPortText = '3 salidas';
            if (splitterPorts === '4') splitterPortText = '4 salidas';
            if (splitterPorts === 'more') splitterPortText = 'Más de 4 salidas';
            
            let extraSplitterText = '';
            if (splitterPorts !== 'none' && splitterPorts !== 'more') {
                const catRadio = document.querySelector('input[name="splitter-cat"]:checked');
                const condRadio = document.querySelector('input[name="splitter-cond"]:checked');
                const cat = catRadio ? catRadio.value : 'quality';
                const cond = condRadio ? condRadio.value : 'good';
                let catMap = { quality: 'De Calidad', basic: 'Básico' };
                let condMap = { good: 'Bueno', bad: 'Malo' };
                extraSplitterText = ` (${catMap[cat]}, Estado: ${condMap[cond]})`;
            }
            
            let buyDecosStr = chkBuyDecos.checked ? `, Adquiere ${decoQtyRequested} Decos` : '';
            let multiSplitStr = (splitterPorts !== 'none' && hasMultipleSplitters) ? ' [Multi-Splitter]' : '';
            summaryTvSpec.textContent = `${totalTvs} TVs (Dig: ${tvDigitalQty}, Ana: ${tvAnalogQty}${buyDecosStr}) - Splitter: ${splitterPortText}${extraSplitterText}${multiSplitStr}`;
        }
        
        // Hardware deliverables list
        let routerName = "Ninguno (Solo TV)";
        if (service !== 'tv') {
            // Defaulting router to standard/premium WiFi 6 based on speed
            routerName = parseInt(speed) >= 500 ? "ONT Premium WiFi 6" : "ONT Estándar GPON";
        }
        
        let extrasList = [];
        if (service !== 'tv' && hasRepeater) {
            extrasList.push('1 Repetidor WiFi');
            if (needUtp) extrasList.push('Cable UTP adicional');
        }
        if (service !== 'internet' && chkBuyDecos.checked && decoQtyRequested > 0) {
            extrasList.push(`${decoQtyRequested} Decodificador(es) Digital(es)`);
        }
        if (service !== 'internet' && needCoaxial) {
            extrasList.push('Cable Coaxial adicional');
        }
        
        let extrasStr = extrasList.length > 0 ? ` + [${extrasList.join(', ')}]` : '';
        summaryEquip.textContent = `${routerName}${extrasStr}`;
        
        // --- Rules Validation Checklist ---
        const validations = [];
        
        // Rule 1: Piso de instalación del router (Internet)
        if (service !== 'tv') {
            const floorNum = parseInt(floor);
            if (floorNum >= 3) {
                validations.push({
                    status: 'warn',
                    text: `<strong>Piso de Instalación:</strong> Instalación en ${floor}. Posible atenuación de cobertura WiFi en otros pisos del predio.`
                });
            } else {
                validations.push({
                    status: 'ok',
                    text: `<strong>Piso de Instalación:</strong> Router principal en ${floor} (Cobertura base correcta).`
                });
            }
        }
        
        // Rule 2: Repetidor & UTP (Internet)
        if (service !== 'tv') {
            if (hasRepeater) {
                validations.push({
                    status: 'ok',
                    text: `<strong>Repetidor WiFi:</strong> Cliente requiere repetidor para expansión de cobertura. Cable UTP extra: ${needUtp ? 'Requerido' : 'No requerido'}.`
                });
            }
        }
        
        // Rule 3: Decodificadores para TVs Analógicos (TV)
        if (service !== 'internet') {
            if (tvAnalogQty > 0) {
                if (!chkBuyDecos.checked) {
                    validations.push({
                        status: 'err',
                        text: `<strong>Decodificadores TV:</strong> El cliente tiene ${tvAnalogQty} TV(s) sin señal digital y NO solicita decodificadores. Se quedarán sin señal.`
                    });
                } else if (decoQtyRequested < tvAnalogQty) {
                    validations.push({
                        status: 'warn',
                        text: `<strong>Decodificadores TV:</strong> Cantidad de decodificadores (${decoQtyRequested}) es menor que las pantallas analógicas (${tvAnalogQty}). Equipos restantes se quedarán sin señal.`
                    });
                } else {
                    validations.push({
                        status: 'ok',
                        text: `<strong>Decodificadores TV:</strong> Se entregan ${decoQtyRequested} decodificadores digitales para cubrir todas las pantallas analógicas.`
                    });
                }
            } else {
                validations.push({
                    status: 'ok',
                    text: '<strong>Televisores:</strong> Todas las pantallas del cliente cuentan con recepción de señal digital.'
                });
            }
        }
        
        // Rule 4: Splitter de TV (TV)
        if (service !== 'internet') {
            if (splitterPorts === 'none') {
                validations.push({
                    status: 'ok',
                    text: '<strong>Splitter de TV:</strong> Conexión directa a TV (Sin splitter en predio).'
                });
            } else if (splitterPorts === 'more') {
                validations.push({
                    status: 'warn',
                    text: '<strong>Splitter de TV (Más de 4 salidas):</strong> Riesgo de pérdida de señal. *El cliente necesita adquirir un amplificador de señal digital*.'
                });
            } else {
                // Splitter 2, 3, 4 salidas
                const catRadio = document.querySelector('input[name="splitter-cat"]:checked');
                const condRadio = document.querySelector('input[name="splitter-cond"]:checked');
                const cat = catRadio ? catRadio.value : 'quality';
                const cond = condRadio ? condRadio.value : 'good';
                
                if (cat === 'basic' || cond === 'bad') {
                    let reasons = [];
                    if (cat === 'basic') reasons.push('es básico');
                    if (cond === 'bad') reasons.push('está en mal estado');
                    validations.push({
                        status: 'warn',
                        text: `<strong>Splitter de TV Inadecuado:</strong> El splitter ${reasons.join(' y ')}. *Es necesario cambiar de splitter* para garantizar calidad.`
                    });
                } else {
                    validations.push({
                        status: 'ok',
                        text: `<strong>Splitter de TV:</strong> Splitter de ${splitterPorts} salidas de calidad y en buen estado.`
                    });
                }
            }
            
            // Rule 5: Múltiples Splitters (TV)
            if (splitterPorts !== 'none' && hasMultipleSplitters) {
                validations.push({
                    status: 'warn',
                    text: '<strong>Múltiples Splitters:</strong> Cuenta con más de un splitter en cascada. *Se debe hacer seguimiento a las potencias y posiblemente necesite un potenciador de señal digital*.'
                });
            }
        }
        
        // Rule 6: Cableado adicional coaxial
        if (service !== 'internet' && needCoaxial) {
            validations.push({
                status: 'warn',
                text: '<strong>Cable Coaxial Extra:</strong> Requiere tramos de cable coaxial adicional para la distribución interna de TV.'
            });
        }
        
        // --- Determine overall status ---
        let overallStatus = 'approved';
        let hasErr = validations.some(v => v.status === 'err');
        let hasWarn = validations.some(v => v.status === 'warn');
        
        if (hasErr) {
            overallStatus = 'danger';
        } else if (hasWarn) {
            overallStatus = 'warning';
        }
        
        resultStatusBadge.className = 'result-badge';
        resultStatusBadge.classList.add(`status-${overallStatus}`);
        
        if (overallStatus === 'danger') {
            resultBadgeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            resultStatusTitle.textContent = "Instalación NO VIABLE";
            resultStatusDesc.textContent = "Existen advertencias críticas domésticas que impiden garantizar el servicio (ej. falta de decodificadores).";
        } else if (overallStatus === 'warning') {
            resultBadgeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
            resultStatusTitle.textContent = "Instalación CONDICIONADA";
            resultStatusDesc.textContent = "Viable, pero requiere cambio de splitter, decos adicionales, amplificadores o cableado extra.";
        } else {
            resultBadgeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            resultStatusTitle.textContent = "Instalación VIABLE";
            resultStatusDesc.textContent = "Todos los parámetros cumplen con las normas internas del domicilio.";
        }
        
        // Render Checklist Results
        checklistResultsList.innerHTML = '';
        validations.forEach(val => {
            const li = document.createElement('li');
            li.className = `check-item ${val.status}`;
            
            let iconSvg = '';
            if (val.status === 'ok') {
                iconSvg = `<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            } else if (val.status === 'warn') {
                iconSvg = `<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
            } else {
                iconSvg = `<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            }
            
            li.innerHTML = `
                ${iconSvg}
                <div class="check-text">${val.text}</div>
            `;
            checklistResultsList.appendChild(li);
        });
        
        // --- WhatsApp Report Generation ---
        btnShareWhatsapp.onclick = () => {
            const statusEmoji = overallStatus === 'danger' ? '❌' : (overallStatus === 'warning' ? '⚠️' : '✅');
            const statusLabel = overallStatus === 'danger' ? 'NO VIABLE' : (overallStatus === 'warning' ? 'CONDICIONADA' : 'VIABLE');
            
            let message = `📋 *VALIDACIÓN TÉCNICA DOMÉSTICA*
----------------------------------
👤 *Titular:* ${titularName}
🪪 *DNI:* ${titularDni}
📞 *Contacto:* ${titularPhone}
📍 *Dirección:* ${titularAddress}
📶 *Servicio:* ${serviceStr}`;

            if (service !== 'tv') {
                let repStr = hasRepeater ? `Sí (${needUtp ? 'Con UTP extra' : 'Sin UTP extra'})` : 'No';
                message += `\n🌐 *Internet:* ${speed} Mbps | Piso: ${floor} | Repetidor: ${repStr}`;
            }
            
            if (service !== 'internet') {
                let splitterPortText = 'Sin Splitter';
                if (splitterPorts === '2') splitterPortText = '2 salidas';
                if (splitterPorts === '3') splitterPortText = '3 salidas';
                if (splitterPorts === '4') splitterPortText = '4 salidas';
                if (splitterPorts === 'more') splitterPortText = 'Más de 4 salidas';
                
                let extraSplitterText = '';
                if (splitterPorts !== 'none' && splitterPorts !== 'more') {
                    const catRadio = document.querySelector('input[name="splitter-cat"]:checked');
                    const condRadio = document.querySelector('input[name="splitter-cond"]:checked');
                    const cat = catRadio ? catRadio.value : 'quality';
                    const cond = condRadio ? condRadio.value : 'good';
                    let catMap = { quality: 'Calidad', basic: 'Básico' };
                    let condMap = { good: 'Bueno', bad: 'Malo' };
                    extraSplitterText = ` (${catMap[cat]}, ${condMap[cond]})`;
                }
                
                let buyDecosStr = chkBuyDecos.checked ? `, Adquiere ${decoQtyRequested} Decos` : '';
                let multiSplitStr = (splitterPorts !== 'none' && hasMultipleSplitters) ? ' [Multi-Splitter]' : '';
                message += `\n📺 *TV:* ${totalTvs} TVs (Dig: ${tvDigitalQty}, Ana: ${tvAnalogQty}${buyDecosStr}) | Splitter: ${splitterPortText}${extraSplitterText}${multiSplitStr}`;
            }
            
            message += `\n🛠️ *Entregables:* ${routerName}${extrasStr}
----------------------------------
${statusEmoji} *FACTIBILIDAD: ${statusLabel}*
_${resultStatusDesc.textContent}_

*Evaluaciones del domicilio:*`;

            validations.forEach(val => {
                const mark = val.status === 'ok' ? '✓' : (val.status === 'warn' ? '⚠' : '✗');
                const cleanText = val.text.replace(/<\/?[?]+(>|$)/g, ""); // strip HTML tags
                // Clean HTML fallback tags in case browser regex engine behaves strictly
                const cleanerText = cleanText.replace(/<strong>/g, "").replace(/<\/strong>/g, "");
                message += `\n${mark} ${cleanerText}`;
            });
            
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        };
    }
    
    // Print Page trigger
    btnPrintReport.addEventListener('click', () => {
        window.print();
    });
});
