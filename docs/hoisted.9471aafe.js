import"./chunks/ThemeProvider.astro_astro_type_script_index_0_lang.cf2a8936.js";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=window,Z=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),V=new WeakMap;class nt{constructor(t,e,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Z&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&V.set(e,t))}return t}toString(){return this.cssText}}const ct=n=>new nt(typeof n=="string"?n:n+"",void 0,G),dt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new nt(e,n,G)},pt=(n,t)=>{Z?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=M.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},W=Z?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ct(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;const U=window,q=U.trustedTypes,ut=q?q.emptyScript:"",K=U.reactiveElementPolyfillSupport,D={toAttribute(n,t){switch(t){case Boolean:n=n?ut:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},rt=(n,t)=>t!==n&&(t==t||n==n),R={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:rt};class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;(e=this.h)!==null&&e!==void 0||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=R){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||R}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(W(s))}else t!==void 0&&e.push(W(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return pt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=R){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:D).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:D;this._$El=o,this[o]=c.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||rt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},K?.({ReactiveElement:m}),((F=U.reactiveElementVersions)!==null&&F!==void 0?F:U.reactiveElementVersions=[]).push("1.4.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var I;const H=window,g=H.trustedTypes,J=g?g.createPolicy("lit-html",{createHTML:n=>n}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,ot="?"+$,vt=`<${ot}>`,C=document,S=(n="")=>C.createComment(n),x=n=>n===null||typeof n!="object"&&typeof n!="function",lt=Array.isArray,$t=n=>lt(n)||typeof n?.[Symbol.iterator]=="function",E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,X=/>/g,_=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,tt=/"/g,ht=/^(?:script|style|textarea|title)$/i,_t=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),b=_t(1),y=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),et=new WeakMap,mt=(n,t,e)=>{var i,s;const o=(i=e?.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const c=(s=e?.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new T(t.insertBefore(S(),c),c,void 0,e??{})}return r._$AI(n),r},f=C.createTreeWalker(C,129,null,!1),ft=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=E;for(let l=0;l<e;l++){const h=n[l];let v,a,d=-1,u=0;for(;u<h.length&&(r.lastIndex=u,a=r.exec(h),a!==null);)u=r.lastIndex,r===E?a[1]==="!--"?r=Q:a[1]!==void 0?r=X:a[2]!==void 0?(ht.test(a[2])&&(s=RegExp("</"+a[2],"g")),r=_):a[3]!==void 0&&(r=_):r===_?a[0]===">"?(r=s??E,d=-1):a[1]===void 0?d=-2:(d=r.lastIndex-a[2].length,v=a[1],r=a[3]===void 0?_:a[3]==='"'?tt:Y):r===tt||r===Y?r=_:r===Q||r===X?r=E:(r=_,s=void 0);const L=r===_&&n[l+1].startsWith("/>")?" ":"";o+=r===E?h+vt:d>=0?(i.push(v),h.slice(0,d)+"$lit$"+h.slice(d)+$+L):h+$+(d===-2?(i.push(void 0),l):L)}const c=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[J!==void 0?J.createHTML(c):c,i]};class P{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const c=t.length-1,l=this.parts,[h,v]=ft(t,e);if(this.el=P.createElement(h,i),f.currentNode=this.el.content,e===2){const a=this.el.content,d=a.firstChild;d.remove(),a.append(...d.childNodes)}for(;(s=f.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const a=[];for(const d of s.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith($)){const u=v[r++];if(a.push(d),u!==void 0){const L=s.getAttribute(u.toLowerCase()+"$lit$").split($),k=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:k[2],strings:L,ctor:k[1]==="."?Ct:k[1]==="?"?At:k[1]==="@"?bt:N})}else l.push({type:6,index:o})}for(const d of a)s.removeAttribute(d)}if(ht.test(s.tagName)){const a=s.textContent.split($),d=a.length-1;if(d>0){s.textContent=g?g.emptyScript:"";for(let u=0;u<d;u++)s.append(a[u],S()),f.nextNode(),l.push({type:2,index:++o});s.append(a[d],S())}}}else if(s.nodeType===8)if(s.data===ot)l.push({type:2,index:o});else{let a=-1;for(;(a=s.data.indexOf($,a+1))!==-1;)l.push({type:7,index:o}),a+=$.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function A(n,t,e=n,i){var s,o,r,c;if(t===y)return t;let l=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu;const h=x(t)?void 0:t._$litDirective$;return l?.constructor!==h&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(n),l._$AT(n,e,i)),i!==void 0?((r=(c=e)._$Cl)!==null&&r!==void 0?r:c._$Cl=[])[i]=l:e._$Cu=l),l!==void 0&&(t=A(n,l._$AS(n,t.values),l,i)),t}class gt{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:C).importNode(i,!0);f.currentNode=o;let r=f.nextNode(),c=0,l=0,h=s[0];for(;h!==void 0;){if(c===h.index){let v;h.type===2?v=new T(r,r.nextSibling,this,t):h.type===1?v=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(v=new Et(r,this,t)),this.v.push(v),h=s[++l]}c!==h?.index&&(r=f.nextNode(),c++)}return o}m(t){let e=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class T{constructor(t,e,i,s){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$C_=(o=s?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),x(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==y&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):$t(t)?this.O(t):this.$(t)}S(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==p&&x(this._$AH)?this._$AA.nextSibling.data=t:this.k(C.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(i);else{const r=new gt(o,this),c=r.p(this.options);r.m(i),this.k(c),this._$AH=r}}_$AC(t){let e=et.get(t.strings);return e===void 0&&et.set(t.strings,e=new P(t)),e}O(t){lt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new T(this.S(S()),this.S(S()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$C_=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class N{constructor(t,e,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=A(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==y,r&&(this._$AH=t);else{const c=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=A(this,c[i+l],e,l),h===y&&(h=this._$AH[l]),r||(r=!x(h)||h!==this._$AH[l]),h===p?t=p:t!==p&&(t+=(h??"")+o[l+1]),this._$AH[l]=h}r&&!s&&this.P(t)}P(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends N{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===p?void 0:t}}const yt=g?g.emptyScript:"";class At extends N{constructor(){super(...arguments),this.type=4}P(t){t&&t!==p?this.element.setAttribute(this.name,yt):this.element.removeAttribute(this.name)}}class bt extends N{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=A(this,t,e,0))!==null&&i!==void 0?i:p)===y)return;const s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}}const it=H.litHtmlPolyfillSupport;it?.(P,T),((I=H.litHtmlVersions)!==null&&I!==void 0?I:H.litHtmlVersions=[]).push("2.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B,j;class w extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return y}}w.finalized=!0,w._$litElement$=!0,(B=globalThis.litElementHydrateSupport)===null||B===void 0||B.call(globalThis,{LitElement:w});const st=globalThis.litElementPolyfillSupport;st?.({LitElement:w});((j=globalThis.litElementVersions)!==null&&j!==void 0?j:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=n=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(n,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}};function xt(n){return(t,e)=>e!==void 0?((i,s,o)=>{s.constructor.createProperty(o,i)})(n,t,e):St(n,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;((z=window.HTMLSlotElement)===null||z===void 0?void 0:z.prototype.assignedElements)!=null;const Pt=b`<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="12" fill="#F2F2F2" />
	<path
		d="M12 22C10.6868 22 9.38642 21.7413 8.17316 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2L12 12L12 22Z"
		fill="white"
	/>
	<path
		d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 12L22 12Z"
		fill="#EEF1F3"
	/>
	<path
		d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L12 12L12 2Z"
		fill="black"
	/>
</svg> `,Tt=b`<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="12" fill="#F2F2F2" />
	<path
		d="M12 22C10.6868 22 9.38642 21.7413 8.17316 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2L12 12L12 22Z"
		fill="#050505"
	/>
	<path
		d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 12L22 12Z"
		fill="#333333"
	/>
	<path
		d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L12 12L12 2Z"
		fill="white"
	/>
</svg>`,Lt=b`<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="12" fill="#F2F2F2" />
	<path
		d="M12 22C10.6868 22 9.38642 21.7413 8.17316 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2L12 12L12 22Z"
		fill="#CFCDCA"
	/>
	<path
		d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 12L22 12Z"
		fill="#C7C2BA"
	/>
	<path
		d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L12 12L12 2Z"
		fill="#2C3E2D"
	/>
</svg>`,kt=b`<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="12" fill="#F2F2F2" />
	<path
		d="M12 22C10.6868 22 9.38642 21.7413 8.17316 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2L12 12L12 22Z"
		fill="#FAFAFA"
	/>
	<path
		d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 12L22 12Z"
		fill="#EEF1F3"
	/>
	<path
		d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L12 12L12 2Z"
		fill="#1556AC"
	/>
</svg>`,Mt=b`<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="12" fill="#F2F2F2" />
	<path
		d="M12 22C10.6868 22 9.38642 21.7413 8.17316 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2L12 12L12 22Z"
		fill="#FFFFFE"
	/>
	<path
		d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22L12 12L22 12Z"
		fill="white"
	/>
	<path
		d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L12 12L12 2Z"
		fill="#FBA92C"
	/>
</svg>`;var Ut=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,at=(n,t,e,i)=>{for(var s=i>1?void 0:i?Ht(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&Ut(t,e,s),s};let O=class extends w{constructor(){super(...arguments),this._doc=document.firstElementChild,this._heroImage=document.querySelector("#home-hero-image"),this.theme="default"}_getCurrentTheme(){const n=localStorage.getItem("theme");n!==null&&this._setTheme(n)}connectedCallback(){super.connectedCallback(),this._getCurrentTheme()}disconnectedCallback(){super.disconnectedCallback()}_setTheme(n){this._doc.setAttribute("data-theme",n),n==="default"&&(this._heroImage.src="/GGbengSite/assets/images/home/classic-hero.jpg"),n==="dark"&&(this._heroImage.src="/GGbengSite/assets/images/home/dark-hero.jpg"),n==="earth"&&(this._heroImage.src="/GGbengSite/assets/images/home/earth-hero.jpg"),n==="ocean"&&(this._heroImage.src="/GGbengSite/assets/images/home/ocean-hero.jpg"),n==="sand"&&(this._heroImage.src="/assets/images/home/sand-hero.jpg"),localStorage.setItem("theme",n),this.theme=n}render(){return b`
			<div class="theme-switcher__container">
				<div class="theme-select__container">
					<button
						@click=${()=>this._setTheme("default")}
						?active=${this.theme==="default"}
					>
						${Pt}
					</button>
					<p>Classic</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${()=>this._setTheme("dark")}
						?active=${this.theme==="dark"}
					>
						${Tt}
					</button>
					<p>Dark</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${()=>this._setTheme("earth")}
						?active=${this.theme==="earth"}
					>
						${Lt}
					</button>
					<p>Earth</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${()=>this._setTheme("ocean")}
						?active=${this.theme==="ocean"}
					>
						${kt}
					</button>
					<p>Ocean</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${()=>this._setTheme("sand")}
						?active=${this.theme==="sand"}
					>
						${Mt}
					</button>
					<p>Sand</p>
				</div>
			</div>
		`}};O.styles=[dt`
			:host {
				display: block;
			}
			button {
				display: inline-flex;
				outline: none;
				border: none;
				background-color: transparent;
				border: 2px solid transparent;
				border-radius: 20rem;
				padding: 1px;
				cursor: pointer;
				transition: border var(--theme-transition);
			}
			button[active] {
				border: 2px solid var(--theme-primary);
        box-shadow: 0 0 12px 1px var(--theme-primary);
			}
			button:hover {
				border: 2px solid var(--theme-primary);
			}
			.theme-switcher__container {
				margin: 2rem 0;
				display: grid;
				grid-template-columns: repeat(5, 1fr);
			}
			.theme-select__container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.theme-select__container p {
				font-size: var(--font-size-sm);
			}
		`];at([xt({type:String})],O.prototype,"theme",2);O=at([wt("theme-switcher")],O);
