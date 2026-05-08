// ===== STATE =====
let embedCount = 0;
const MAX_EMBEDS = 10;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    
    // Se não tem embeds, carrega o template padrão
    if (embedCount === 0) {
        loadDefaultTemplate();
    }
    
    updateEmbedCounter();
    setupAutoPreview();
});

function loadSavedData() {
    const saved = JSON.parse(localStorage.getItem('embedGenerator') || '{}');
    if (saved.webhookUrl) document.getElementById('webhookUrl').value = saved.webhookUrl;
    // NÃO carrega mais o messageId automaticamente para evitar edições acidentais
    if (saved.username) document.getElementById('webhookUsername').value = saved.username;
    if (saved.avatar) document.getElementById('webhookAvatar').value = saved.avatar;
}

function saveData() {
    const data = {
        webhookUrl: document.getElementById('webhookUrl').value,
        // NÃO salva mais o messageId
        username: document.getElementById('webhookUsername').value,
        avatar: document.getElementById('webhookAvatar').value,
    };
    localStorage.setItem('embedGenerator', JSON.stringify(data));
}

function setupAutoPreview() {
    const debouncedUpdate = debounce(updatePreview, 250);
    document.addEventListener('input', debouncedUpdate);
    document.addEventListener('change', debouncedUpdate);
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// ===== LOAD DEFAULT TEMPLATE =====
function loadDefaultTemplate() {
    // Configura o nome do webhook
    document.getElementById('webhookUsername').value = 'Embed Generator';
    document.getElementById('webhookAvatar').value = '';
    document.getElementById('messageContent').value = '';
    
    // ===== EMBED 1: Boas-vindas =====
    const template = document.getElementById('embedTemplate');
    const clone1 = template.content.cloneNode(true);
    embedCount = 1;
    
    // Preenche os campos da primeira embed
    clone1.querySelector('.embed-author-name').value = 'Embed Generator';
    clone1.querySelector('.embed-author-icon').value = 'https://cdn.discordapp.com/embed/avatars/0.png';
    clone1.querySelector('.embed-author-url').value = '';
    
    clone1.querySelector('.embed-title').value = 'Welcome to Embed Generator! 🎉';
    clone1.querySelector('.embed-title-url').value = '';
    
    clone1.querySelector('.embed-description').value = 'Create stunning embed messages for your Discord server with ease!\n\nIf you\'re ready to start, simply click on the **"Clear"** button at the top of the editor and create your own message.\n\nShould you need any assistance or have questions, feel free to join our support server where you can connect with helpful community members and get the support you need.';
    
    const colorInput1 = clone1.querySelector('.embed-color');
    const hexInput1 = clone1.querySelector('.embed-color-hex');
    const colorDot1 = clone1.querySelector('.embed-dot');
    colorInput1.value = '#5865F2';
    hexInput1.value = '#5865F2';
    colorDot1.style.background = '#5865F2';
    colorDot1.style.boxShadow = '0 0 6px #5865F2';
    
    clone1.querySelector('.embed-footer-text').value = 'Embed Generator';
    clone1.querySelector('.embed-footer-icon').value = 'https://cdn.discordapp.com/embed/avatars/0.png';
    clone1.querySelector('.embed-timestamp').checked = true;
    
    // Adiciona fields na primeira embed
    const fieldsContainer1 = clone1.querySelector('.fields-container');
    const fieldTemplate = document.getElementById('fieldTemplate');
    
    const field1 = fieldTemplate.content.cloneNode(true);
    field1.querySelector('.field-name').value = '📝 Create';
    field1.querySelector('.field-value').value = 'Design custom embeds';
    field1.querySelector('.field-inline').checked = true;
    fieldsContainer1.appendChild(field1);
    
    const field2 = fieldTemplate.content.cloneNode(true);
    field2.querySelector('.field-name').value = '👀 Preview';
    field2.querySelector('.field-value').value = 'See changes in real-time';
    field2.querySelector('.field-inline').checked = true;
    fieldsContainer1.appendChild(field2);
    
    const field3 = fieldTemplate.content.cloneNode(true);
    field3.querySelector('.field-name').value = '📤 Send';
    field3.querySelector('.field-value').value = 'Send via webhook or copy JSON';
    field3.querySelector('.field-inline').checked = true;
    fieldsContainer1.appendChild(field3);
    
    // Eventos de cor da embed 1
    colorInput1.addEventListener('input', () => {
        hexInput1.value = colorInput1.value;
        colorDot1.style.background = colorInput1.value;
        colorDot1.style.boxShadow = `0 0 6px ${colorInput1.value}`;
        updatePreview();
    });
    
    hexInput1.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hexInput1.value)) {
            colorInput1.value = hexInput1.value;
            colorDot1.style.background = hexInput1.value;
            colorDot1.style.boxShadow = `0 0 6px ${hexInput1.value}`;
            updatePreview();
        }
    });
    
    document.getElementById('embedsContainer').appendChild(clone1);
    
    // ===== EMBED 2: Como usar =====
    const clone2 = template.content.cloneNode(true);
    embedCount = 2;
    
    clone2.querySelector('.embed-author-name').value = '';
    clone2.querySelector('.embed-author-icon').value = '';
    clone2.querySelector('.embed-author-url').value = '';
    
    clone2.querySelector('.embed-title').value = '📖 How to Use';
    clone2.querySelector('.embed-title-url').value = '';
    
    clone2.querySelector('.embed-description').value = '**1.** Fill in the fields on the left panel\n**2.** Add embeds, fields, and components\n**3.** Preview your message in real-time\n**4.** Paste your webhook URL at the top\n**5.** Click **Send Message** to send it to Discord\n\n**Pro Tip:** To edit a message, paste the Message ID in the field at the top before clicking Send again!';
    
    const colorInput2 = clone2.querySelector('.embed-color');
    const hexInput2 = clone2.querySelector('.embed-color-hex');
    const colorDot2 = clone2.querySelector('.embed-dot');
    colorInput2.value = '#3ba55c';
    hexInput2.value = '#3ba55c';
    colorDot2.style.background = '#3ba55c';
    colorDot2.style.boxShadow = '0 0 6px #3ba55c';
    
    clone2.querySelector('.embed-footer-text').value = 'Made with ❤️';
    clone2.querySelector('.embed-footer-icon').value = '';
    clone2.querySelector('.embed-timestamp').checked = false;
    
    // Eventos de cor da embed 2
    colorInput2.addEventListener('input', () => {
        hexInput2.value = colorInput2.value;
        colorDot2.style.background = colorInput2.value;
        colorDot2.style.boxShadow = `0 0 6px ${colorInput2.value}`;
        updatePreview();
    });
    
    hexInput2.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hexInput2.value)) {
            colorInput2.value = hexInput2.value;
            colorDot2.style.background = hexInput2.value;
            colorDot2.style.boxShadow = `0 0 6px ${hexInput2.value}`;
            updatePreview();
        }
    });
    
    document.getElementById('embedsContainer').appendChild(clone2);
    
    updateEmbedCounter();
    updateEmbedNumbers();
    updatePreview();
}

// ===== EMBED MANAGEMENT =====
function addEmbed() {
    if (embedCount >= MAX_EMBEDS) {
        document.getElementById('embedLimitWarning').style.display = 'block';
        showToast('Maximum of 10 embeds reached!', 'warning');
        return;
    }
    
    const template = document.getElementById('embedTemplate');
    const clone = template.content.cloneNode(true);
    
    embedCount++;
    
    // Eventos de cor
    const colorInput = clone.querySelector('.embed-color');
    const hexInput = clone.querySelector('.embed-color-hex');
    const colorDot = clone.querySelector('.embed-dot');
    
    colorInput.addEventListener('input', () => {
        hexInput.value = colorInput.value;
        colorDot.style.background = colorInput.value;
        colorDot.style.boxShadow = `0 0 6px ${colorInput.value}`;
        updatePreview();
    });
    
    hexInput.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value)) {
            colorInput.value = hexInput.value;
            colorDot.style.background = hexInput.value;
            colorDot.style.boxShadow = `0 0 6px ${hexInput.value}`;
            updatePreview();
        }
    });
    
    document.getElementById('embedsContainer').appendChild(clone);
    updateEmbedCounter();
    updateEmbedNumbers();
    updatePreview();
}

function removeEmbed(btn) {
    const embed = btn.closest('.embed-card');
    embed.style.opacity = '0';
    embed.style.transform = 'translateX(20px)';
    embed.style.transition = 'all 0.2s ease';
    
    setTimeout(() => {
        embed.remove();
        embedCount--;
        updateEmbedCounter();
        updateEmbedNumbers();
        updatePreview();
        
        if (embedCount < MAX_EMBEDS) {
            document.getElementById('embedLimitWarning').style.display = 'none';
        }
    }, 200);
}

function duplicateEmbed(btn) {
    if (embedCount >= MAX_EMBEDS) {
        document.getElementById('embedLimitWarning').style.display = 'block';
        showToast('Maximum of 10 embeds reached!', 'warning');
        return;
    }
    
    const original = btn.closest('.embed-card');
    const clone = original.cloneNode(true);
    
    // Reaplicar eventos
    const colorInput = clone.querySelector('.embed-color');
    const hexInput = clone.querySelector('.embed-color-hex');
    const colorDot = clone.querySelector('.embed-dot');
    
    colorInput.addEventListener('input', () => {
        hexInput.value = colorInput.value;
        colorDot.style.background = colorInput.value;
        colorDot.style.boxShadow = `0 0 6px ${colorInput.value}`;
        updatePreview();
    });
    
    hexInput.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value)) {
            colorInput.value = hexInput.value;
            colorDot.style.background = hexInput.value;
            colorDot.style.boxShadow = `0 0 6px ${hexInput.value}`;
            updatePreview();
        }
    });
    
    // Garantir que o body está expandido
    const body = clone.querySelector('.embed-card-body');
    if (body) body.classList.remove('collapsed');
    const header = clone.querySelector('.embed-card-header');
    if (header) header.classList.remove('collapsed');
    
    original.parentNode.insertBefore(clone, original.nextSibling);
    embedCount++;
    updateEmbedCounter();
    updateEmbedNumbers();
    updatePreview();
}

function toggleEmbedCard(header) {
    const card = header.closest('.embed-card');
    const body = card.querySelector('.embed-card-body');
    body.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
}

function updateEmbedCounter() {
    document.getElementById('embedCounter').textContent = `${embedCount}/${MAX_EMBEDS}`;
    
    const addBtn = document.getElementById('addEmbedBtn');
    if (embedCount >= MAX_EMBEDS) {
        addBtn.style.opacity = '0.5';
        addBtn.style.pointerEvents = 'none';
    } else {
        addBtn.style.opacity = '1';
        addBtn.style.pointerEvents = 'auto';
    }
}

function updateEmbedNumbers() {
    document.querySelectorAll('.embed-card').forEach((embed, i) => {
        const label = embed.querySelector('.embed-label');
        if (label) label.textContent = `Embed #${i + 1}`;
    });
}

// ===== FIELD MANAGEMENT =====
function addField(btn) {
    const template = document.getElementById('fieldTemplate');
    const clone = template.content.cloneNode(true);
    const container = btn.closest('.mt-3').querySelector('.fields-container');
    container.appendChild(clone);
    updatePreview();
}

function removeField(btn) {
    const field = btn.closest('.field-row');
    field.style.opacity = '0';
    field.style.transition = 'all 0.15s ease';
    setTimeout(() => {
        field.remove();
        updatePreview();
    }, 150);
}

// ===== COMPONENT MANAGEMENT =====
function addComponentRow() {
    const template = document.getElementById('componentRowTemplate');
    const clone = template.content.cloneNode(true);
    document.getElementById('componentsContainer').appendChild(clone);
    updatePreview();
}

function removeComponentRow(btn) {
    btn.closest('.component-card').remove();
    updatePreview();
}

function addButton(btn) {
    const template = document.getElementById('buttonTemplate');
    const clone = template.content.cloneNode(true);
    
    const styleSelect = clone.querySelector('.button-style-select');
    const urlInput = clone.querySelector('.button-url');
    const customIdInput = clone.querySelector('.button-custom-id');
    
    styleSelect.addEventListener('change', () => {
        if (styleSelect.value === '5') {
            urlInput.style.display = 'block';
            customIdInput.style.display = 'none';
        } else {
            urlInput.style.display = 'none';
            customIdInput.style.display = 'block';
        }
        updatePreview();
    });
    
    const container = btn.closest('.component-card').querySelector('.buttons-container');
    container.appendChild(clone);
    updatePreview();
}

function removeButton(btn) {
    btn.closest('.button-card').remove();
    updatePreview();
}

// ===== BUILD PAYLOAD =====
function buildPayload() {
    const payload = {};
    
    const content = document.getElementById('messageContent').value;
    if (content) payload.content = content;
    
    const username = document.getElementById('webhookUsername').value;
    const avatar = document.getElementById('webhookAvatar').value;
    if (username) payload.username = username;
    if (avatar) payload.avatar_url = avatar;
    
    // Flags
    if (document.getElementById('flagTTS').checked) payload.tts = true;
    let flags = 0;
    if (document.getElementById('flagSuppressEmbeds').checked) flags |= 4;
    if (flags) payload.flags = flags;
    
    // Embeds
    const embeds = [];
    document.querySelectorAll('.embed-card').forEach(el => {
        const embed = {};
        
        const authorName = el.querySelector('.embed-author-name').value;
        const authorIcon = el.querySelector('.embed-author-icon').value;
        const authorUrl = el.querySelector('.embed-author-url').value;
        const title = el.querySelector('.embed-title').value;
        const titleUrl = el.querySelector('.embed-title-url').value;
        const description = el.querySelector('.embed-description').value;
        const color = el.querySelector('.embed-color').value;
        const image = el.querySelector('.embed-image').value;
        const thumbnail = el.querySelector('.embed-thumbnail').value;
        const footerText = el.querySelector('.embed-footer-text').value;
        const footerIcon = el.querySelector('.embed-footer-icon').value;
        const timestamp = el.querySelector('.embed-timestamp').checked;
        
        if (authorName) {
            embed.author = { name: authorName };
            if (authorIcon) embed.author.icon_url = authorIcon;
            if (authorUrl) embed.author.url = authorUrl;
        }
        if (title) {
            embed.title = title;
            if (titleUrl) embed.url = titleUrl;
        }
        if (description) embed.description = description;
        if (color && color !== '#5865F2') embed.color = parseInt(color.replace('#', ''), 16);
        if (image) embed.image = { url: image };
        if (thumbnail) embed.thumbnail = { url: thumbnail };
        if (footerText) {
            embed.footer = { text: footerText };
            if (footerIcon) embed.footer.icon_url = footerIcon;
        }
        if (timestamp) embed.timestamp = new Date().toISOString();
        
        // Fields
        const fieldRows = el.querySelectorAll('.field-row');
        if (fieldRows.length) {
            embed.fields = [];
            fieldRows.forEach(row => {
                const name = row.querySelector('.field-name').value;
                const value = row.querySelector('.field-value').value;
                const inline = row.querySelector('.field-inline').checked;
                if (name || value) {
                    embed.fields.push({
                        name: name || '\u200b',
                        value: value || '\u200b',
                        inline
                    });
                }
            });
        }
        
        if (Object.keys(embed).length) embeds.push(embed);
    });
    
    if (embeds.length) payload.embeds = embeds;
    
    // Components
    const componentRows = document.querySelectorAll('.component-card');
    if (componentRows.length) {
        payload.components = [];
        componentRows.forEach(row => {
            const rowData = { type: 1, components: [] };
            row.querySelectorAll('.button-card').forEach(btn => {
                const style = parseInt(btn.querySelector('.button-style-select').value);
                const label = btn.querySelector('.button-label').value;
                const customId = btn.querySelector('.button-custom-id').value;
                const url = btn.querySelector('.button-url').value;
                const emoji = btn.querySelector('.button-emoji').value;
                
                if (!label) return;
                
                const btnData = { type: 2, style, label };
                
                if (style === 5 && url) btnData.url = url;
                else if (style !== 5 && customId) btnData.custom_id = customId;
                else if (style !== 5) btnData.custom_id = 'button_' + Math.random().toString(36).slice(2, 8);
                
                if (emoji) btnData.emoji = { name: emoji };
                
                rowData.components.push(btnData);
            });
            if (rowData.components.length) payload.components.push(rowData);
        });
    }
    
    return payload;
}

// ===== UPDATE PREVIEW =====
function updatePreview() {
    const payload = buildPayload();
    const container = document.getElementById('previewContent');
    const hasContent = payload.content || payload.embeds?.length || payload.components?.length;
    
    // Character count
    const contentLen = document.getElementById('messageContent').value.length;
    document.getElementById('charCount').textContent = `${contentLen}/2000`;
    
    // Save data (sem messageId)
    saveData();
    
    if (!hasContent) {
        container.innerHTML = `
            <div class="preview-empty">
                <div class="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="30" stroke="#3f4147" stroke-width="2" stroke-dasharray="4 4"/>
                        <path d="M24 28h16M24 36h10" stroke="#3f4147" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <p class="empty-text">Your message preview</p>
                <p class="empty-sub">Start editing to see how it looks on Discord</p>
            </div>`;
        return;
    }
    
    let html = '<div class="discord-msg">';
    
    // Avatar
    if (payload.avatar_url) {
        html += `<div class="discord-avatar" style="background-image:url('${esc(payload.avatar_url)}')"></div>`;
    } else {
        html += '<div class="discord-avatar"></div>';
    }
    
    html += '<div class="discord-body">';
    
    // Name row
    html += '<div class="discord-name-row">';
    html += `<span class="discord-name">${esc(payload.username || 'Spidey Bot')}</span>`;
    html += '<span class="discord-tag">APP</span>';
    html += '<span class="discord-time">Today at ' + new Date().toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', hour12:true}) + '</span>';
    html += '</div>';
    
    // Content
    if (payload.content) {
        html += `<div class="discord-text">${parseMarkdown(esc(payload.content))}</div>`;
    }
    
    // Embeds
    if (payload.embeds) {
        payload.embeds.forEach(embed => {
            const color = embed.color ? '#' + embed.color.toString(16).padStart(6, '0') : '#5865F2';
            html += `<div class="discord-embed" style="border-left-color:${color}">`;
            
            // Author
            if (embed.author) {
                html += '<div class="embed-auth">';
                if (embed.author.icon_url) {
                    html += `<img src="${esc(embed.author.icon_url)}" class="embed-auth-icon" onerror="this.style.display='none'">`;
                }
                html += '<span class="embed-auth-name">';
                html += embed.author.url
                    ? `<a href="${esc(embed.author.url)}" target="_blank">${esc(embed.author.name)}</a>`
                    : esc(embed.author.name);
                html += '</span></div>';
            }
            
            // Title
            if (embed.title) {
             if (embed.url) {
                html += `<div class="embed-ttl"><a href="${esc(embed.url)}" target="_blank">${esc(embed.title)}</a></div>`;
               } else {
               html += `<div class="embed-ttl" style="color:#fff;">${esc(embed.title)}</div>`;
             }
            }
            
            // Description
            if (embed.description) {
                html += `<div class="embed-desc">${parseMarkdown(esc(embed.description))}</div>`;
            }
            
            // Fields
            if (embed.fields?.length) {
                const inlineCount = embed.fields.filter(f => f.inline).length;
                let cls = 'embed-fields';
                if (inlineCount >= 3) cls += ' in3';
                else if (inlineCount >= 2) cls += ' in2';
                
                html += `<div class="${cls}">`;
                embed.fields.forEach(f => {
                    html += '<div>';
                    html += `<div class="embed-fname">${esc(f.name)}</div>`;
                    html += `<div class="embed-fval">${parseMarkdown(esc(f.value))}</div>`;
                    html += '</div>';
                });
                html += '</div>';
            }
            
            // Thumbnail
            if (embed.thumbnail) {
                html += `<img src="${esc(embed.thumbnail.url)}" class="embed-thumb" onerror="this.style.display='none'">`;
            }
            
            // Image
            if (embed.image) {
                html += `<img src="${esc(embed.image.url)}" class="embed-img" onerror="this.style.display='none'">`;
            }
            
            // Footer
            if (embed.footer) {
                html += '<div class="embed-foot">';
                if (embed.footer.icon_url) {
                    html += `<img src="${esc(embed.footer.icon_url)}" class="embed-foot-icon" onerror="this.style.display='none'">`;
                }
                html += `<span class="embed-foot-text">${esc(embed.footer.text)}</span>`;
                html += '</div>';
            }
            
            // Timestamp
            if (embed.timestamp) {
                html += `<div class="embed-ts">${new Date(embed.timestamp).toLocaleString()}</div>`;
            }
            
            html += '</div>';
        });
    }
    
    // Components
    if (payload.components) {
        html += '<div class="discord-btns">';
        payload.components.forEach(row => {
            html += '<div class="discord-btn-row">';
            row.components.forEach(btn => {
                const styles = {1:'p', 2:'s', 3:'g', 4:'d', 5:'l'};
                const label = btn.emoji ? `${btn.emoji.name} ${btn.label}` : btn.label;
                html += `<button class="discord-btn ${styles[btn.style] || 's'}">${esc(label)}</button>`;
            });
            html += '</div>';
        });
        html += '</div>';
    }
    
    html += '</div></div>';
    container.innerHTML = html;
}

function parseMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/__(.+?)__/g, '<u>$1</u>')
        .replace(/~~(.+?)~~/g, '<s>$1</s>')
        .replace(/`(.+?)`/g, '<code style="background:#1a1b1e;padding:1px 4px;border-radius:3px;font-size:12px;">$1</code>')
        .replace(/\n/g, '<br>');
}

function esc(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== SEND / EDIT WEBHOOK COM RATE LIMIT HANDLER =====
async function sendWebhook() {
    const webhookUrl = document.getElementById('webhookUrl').value.trim();
    const messageId = document.getElementById('messageId').value.trim();
    
    if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
        showToast('Invalid webhook URL!', 'error');
        return;
    }
    
    let url = webhookUrl + '?wait=true';
    let method = 'POST';
    
    // Só edita se o usuário colocou manualmente um Message ID
    if (messageId) {
        url = `${webhookUrl}/messages/${messageId}?wait=true`;
        method = 'PATCH';
    }
    
    const payload = buildPayload();
    
    if (!payload.content && !payload.embeds?.length && !payload.components?.length) {
        showToast('Add some content first!', 'error');
        return;
    }
    
    const btn = document.getElementById('sendBtn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg> ${messageId ? 'Editing...' : 'Sending...'}`;
    btn.disabled = true;
    
    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        // ===== TRATAMENTO DE RATE LIMIT =====
        if (response.status === 429) {
            // Pegando o tempo de espera do header ou usando um padrão
            const retryAfter = response.headers.get('Retry-After') || response.headers.get('X-RateLimit-Reset-After') || 5;
            const waitSeconds = Math.ceil(parseFloat(retryAfter));
            
            // Mostra um toast avisando
            showToast(`⚠️ Rate limited! Waiting ${waitSeconds}s...`, 'warning');
            
            // Atualiza o botão para mostrar contagem regressiva
            let secondsLeft = waitSeconds;
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg> Wait ${secondsLeft}s...`;
            
            // Atualiza o botão a cada segundo
            const countdownInterval = setInterval(() => {
                secondsLeft--;
                if (secondsLeft > 0) {
                    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg> Wait ${secondsLeft}s...`;
                }
            }, 1000);
            
            // Aguarda o tempo necessário e tenta novamente
            await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
            clearInterval(countdownInterval);
            
            // Tenta reenviar
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg> Retrying...`;
            
            const retryResponse = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (retryResponse.ok) {
                let data = null;
                try { data = await retryResponse.json(); } catch (e) {}
                
                if (!messageId && data && data.id) {
                    showToast(`Message sent! 🚀 ID: ${data.id}`, 'success');
                } else if (messageId) {
                    showToast('Message edited successfully! ✅', 'success');
                    document.getElementById('messageId').value = '';
                } else {
                    showToast('Message sent! ✅', 'success');
                }
            } else {
                let errorMessage = `HTTP ${retryResponse.status}`;
                try {
                    const errorData = await retryResponse.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {}
                
                // Se ainda for rate limit, mostra mensagem mais clara
                if (retryResponse.status === 429) {
                    const globalLimit = retryResponse.headers.get('X-RateLimit-Global');
                    errorMessage = globalLimit 
                        ? 'Discord global rate limit. Try again in a few minutes.'
                        : 'Too many requests. Slow down!';
                }
                
                throw new Error(errorMessage);
            }
            
            return; // Sai da função após o retry bem sucedido
        }
        
        // ===== RESPOSTA NORMAL (não rate limit) =====
        if (response.ok) {
            let data = null;
            try { data = await response.json(); } catch (e) {}
            
            if (!messageId && data && data.id) {
                showToast(`Message sent! 🚀 ID: ${data.id}`, 'success');
            } else if (messageId) {
                showToast('Message edited successfully! ✅', 'success');
                document.getElementById('messageId').value = '';
            } else {
                showToast('Message sent! ✅', 'success');
            }
        } else {
            let errorMessage = `HTTP ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {}
            throw new Error(errorMessage);
        }
        
    } catch (error) {
        // Mensagens de erro mais amigáveis
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            showToast('Network error! Check your connection or webhook URL.', 'error');
        } else {
            showToast(`Error: ${error.message}`, 'error');
        }
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
}
// ===== COPY JSON =====
function copyPayload() {
    const payload = buildPayload();
    
    if (!payload.content && !payload.embeds?.length && !payload.components?.length) {
        showToast('Nothing to copy!', 'error');
        return;
    }
    
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
        .then(() => showToast('JSON copied! 📋', 'success'))
        .catch(() => showToast('Failed to copy', 'error'));
}

// ===== CLEAR ALL =====
function clearAll() {
    if (!confirm('Clear everything? This will reset to the default template.')) return;
    
    document.getElementById('messageContent').value = '';
    document.getElementById('webhookUsername').value = '';
    document.getElementById('webhookAvatar').value = '';
    document.getElementById('messageId').value = '';
    document.getElementById('embedsContainer').innerHTML = '';
    document.getElementById('componentsContainer').innerHTML = '';
    document.getElementById('flagTTS').checked = false;
    document.getElementById('flagSuppressEmbeds').checked = false;
    document.getElementById('charCount').textContent = '0/2000';
    
    embedCount = 0;
    updateEmbedCounter();
    updatePreview();
    
    showToast('Cleared! Loading default template...', 'success');
    
    // Recarrega o template padrão
    setTimeout(() => {
        loadDefaultTemplate();
    }, 500);
}

// ===== PREVIEW MODE =====
function changePreviewMode(mode) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.toggle-btn[data-mode="${mode}"]`).classList.add('active');
    document.getElementById('previewContent').classList.toggle('mobile', mode === 'mobile');
}

// ===== TOAST =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideL 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}