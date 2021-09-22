(this["webpackJsonpgraph-solutions"]=this["webpackJsonpgraph-solutions"]||[]).push([[0],{15:function(e,n,t){},25:function(e,n,t){},34:function(e,n,t){"use strict";t.r(n);var o=t(0),i=t.n(o),s=t(16),c=t.n(s),r=t(5),a=(t(15),t(17)),h=t(6),l=t(7),d=function(){function e(n,t,o){Object(h.a)(this,e),this.id=n,this.x=t,this.y=o,this.connectTo={},this.selectMe=!1,this.numConnections=0}return Object(l.a)(e,[{key:"addNeight",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.connectTo[e]=n,this.numConnections++}},{key:"removeNeight",value:function(e){delete this.connectTo[e],this.numConnections--}},{key:"drawEdge",value:function(e,n,t,o){e.strokeStyle="black",e.lineWidth=1,e.beginPath();var i=this.x,s=this.y,c=n.x,r=n.y;e.moveTo(i,s);var a=c-this.x,h=r-this.y,l=Math.atan2(h,a),d=r-20*Math.sin(l),u=c-20*Math.cos(l);if(e.lineTo(u,d),t){e.moveTo(u,d),e.lineTo(u-15*Math.cos(l-Math.PI/6),d-15*Math.sin(l-Math.PI/6)),e.moveTo(u,d),e.lineTo(u-15*Math.cos(l+Math.PI/6),d-15*Math.sin(l+Math.PI/6))}e.stroke(),e.font="30px Comic Sans MS",e.fillStyle="red",e.textAlign="center",e.fillText(o,(i+c)/2,(s+r)/2)}},{key:"drawVertex",value:function(e){e.beginPath(),e.arc(this.x,this.y,20,0,2*Math.PI),this.selectMe?e.fillStyle="orange":e.fillStyle="white",e.fill(),e.lineWidth=2,e.strokeStyle="black",e.stroke(),e.font="15px Comic Sans MS",e.fillStyle="black",e.textAlign="center",e.fillText(this.id,this.x,this.y)}}]),e}(),u=function(){function e(n,t,o){var i=this;Object(h.a)(this,e),this.redraw=function(e){var n=[],t=!1;for(var o in e.clearRect(0,0,i.width,i.height),i.nodesOn){if(i.nodesOn[o].numConnections>0)for(var s in i.nodesOn[o].connectTo){if(0===n.length)n.push((parseInt(s)+1)*(parseInt(o)+1));else{var c,r=Object(a.a)(n);try{for(r.s();!(c=r.n()).done;){var h=c.value;parseInt(h)===(parseInt(s)+1)*(parseInt(o)+1)&&(t=!0)}}catch(l){r.e(l)}finally{r.f()}}t||i.nodesOn[o].drawEdge(e,i.nodesOn[s],i.directed,i.nodesOn[o].connectTo[s]),t=!1}i.nodesOn[o].drawVertex(e)}},this.auto_id=0,this.numNodes=0,this.nodesOn={},this.height=n,this.width=t,this.directed=o}return Object(l.a)(e,[{key:"addNode",value:function(e,n){return void 0===this.nodesOn[this.auto_id]&&(this.nodesOn[this.auto_id]=new d(this.auto_id,e,n),this.auto_id++,this.numNodes++,!0)}},{key:"addNeightNode",value:function(e,n,t){this.nodesOn[e].addNeight(n,t),this.directed||this.nodesOn[n].addNeight(e,t)}},{key:"removeNode",value:function(e){for(var n in this.nodesOn)if(this.nodesOn[n].numConnections>0)for(var t in this.nodesOn[n].connectTo)t===e&&delete this.nodesOn[n].connectTo[t];this.nodesOn[e].connectTo={},delete this.nodesOn[e],this.numNodes--}}]),e}();function j(e,n){return e[2]<n[2]?-1:e[2]>n[2]?1:0}var O=function(){function e(n){Object(h.a)(this,e),this.myGraph=n,this.numComponents=n.numNodes,this.solution=[]}return Object(l.a)(e,[{key:"find",value:function(e,n){for(var t=e;t!==n[e];)t=n[e];return t}},{key:"union",value:function(e,n,t,o){var i=this.find(e,t),s=this.find(n,t);return i!==s&&(o[i]<o[s]?(o[s]+=o[i],t[i]=parseInt(s)):(o[i]+=o[s],t[s]=parseInt(i)),this.numComponents--,!0)}},{key:"solve",value:function(){var e=[];for(var n in this.myGraph.nodesOn)for(var t in this.myGraph.nodesOn[n].connectTo){var o=[n,t,this.myGraph.nodesOn[n].connectTo[t]];e.push(o)}e=function(e){var n=[];for(var t in e)if(0===t)n.push(e[t]);else{if(1===t)continue;t%2===0&&n.push(e[t])}return n}(e.sort(j));for(var i=[],s=[],c=0;c<this.myGraph.numNodes;c++)i.push(1),s.push(c);for(var r=0;r<e.length&&1!==this.numComponents;){var a=parseInt(e[r][0]),h=parseInt(e[r][1]);this.union(a,h,s,i)&&this.solution.push([a,h]),r++}}}]),e}();function f(e,n){return null!==e&&n.nodesOn[e].selectMe?(n.nodesOn[e].selectMe=!1,n.removeNode(e),[n,null,!0]):[n,e,!1]}function v(e,n,t,o){var i=e.clientX,s=e.clientY;return null!==t&&o?(n.nodesOn[t].x=i,n.nodesOn[t].y=s,[n,!0]):[n,!1]}function b(e,n,t,o){var i,s,c=e.clientX,a=e.clientY;if(0===n.numNodes)n.addNode(c,a);else{var h=function(e,n,t){var o=0,i=1e10;for(var s in e.nodesOn){var c=Math.pow(e.nodesOn[s].x-n,2)+Math.pow(e.nodesOn[s].y-t,2);i>c&&(i=c,o=s)}return[i,o]}(n,c,a),l=Object(r.a)(h,2),d=l[0],u=l[1];d<800&&!n.nodesOn[u].selectMe?(n.nodesOn[u].selectMe=!0,null===t?t=u:(o=u,n.addNeightNode(t,o,(i=-20,s=20,Math.floor(Math.random()*(s-i))+i)),n.nodesOn[t].selectMe=!1,n.nodesOn[o].selectMe=!1,t=null,o=null)):d<800&&n.nodesOn[u].selectMe?(n.nodesOn[u].selectMe=!1,t===u&&(n.nodesOn[t].selectMe=!1,t=null)):n.addNode(c,a)}return[n,t,o]}var p=t(1),x=null,g=null,m=!1;var M=function(e){var n=e.height,t=e.width,i=Object(o.useRef)(null),s=Object(o.useRef)(null);Object(o.useEffect)((function(){var e=i.current.getContext("2d");s.current=e}),[]);var c=new u(n,t,!1);return Object(p.jsxs)("main",{children:[Object(p.jsx)("canvas",{onClick:function(e){e.preventDefault();var n=b(e,c,x,g),t=Object(r.a)(n,3);c=t[0],x=t[1],g=t[2],c.redraw(s.current)},onMouseDown:function(e){null!==x&&(m=!0)},onTouchStart:function(e){console.log("handleTouchStart"),null!==x&&(m=!0)},onTouchMove:function(e){var n=v({clientX:e.touches[0].clientX,clientY:e.touches[0].clientY},c,x,m),t=Object(r.a)(n,2);c=t[0],t[1]&&c.redraw(s.current)},onMouseMove:function(e){e.preventDefault();var n=v(e,c,x,m),t=Object(r.a)(n,2);c=t[0],t[1]&&c.redraw(s.current)},onMouseUp:function(e){e.preventDefault(),m=!1},onTouchEnd:function(e){console.log("handleTouchEnd"),m=!1},className:"canvas",ref:i,width:t,height:n}),Object(p.jsxs)("div",{id:"control-panel",children:[Object(p.jsxs)("div",{id:"changeButtons",children:[Object(p.jsx)("button",{id:"play",onClick:function(){new O(c).solve()},children:"Solve"}),Object(p.jsx)("button",{id:"removeMe",onClick:function(){var e=f(x,c),n=Object(r.a)(e,3);c=n[0],x=n[1],n[2]&&c.redraw(s.current)},children:"Remove Node"}),Object(p.jsx)("button",{id:"autograph",children:"AutoGraph"})]}),Object(p.jsxs)("div",{id:"algorithms-topic",children:[Object(p.jsx)("h1",{children:"Select an algorithm for find the minimum spaning Tree: "}),Object(p.jsxs)("select",{children:[Object(p.jsx)("option",{children:"Kruskal's MST"}),Object(p.jsx)("option",{children:"Prim's MST"})]})]})]})]})},w=null,y=null,T=!1;var k=function(e){var n=e.height,t=e.width,i=Object(o.useRef)(null),s=Object(o.useRef)(null);Object(o.useEffect)((function(){var e=i.current.getContext("2d");s.current=e}),[]);var c=new u(n,t,!0);return Object(p.jsxs)("main",{children:[Object(p.jsx)("canvas",{onClick:function(e){var n=b(e,c,w,y),t=Object(r.a)(n,3);c=t[0],w=t[1],y=t[2],c.redraw(s.current)},onMouseDown:function(e){null!==w&&(T=!0)},onTouchStart:function(e){},onMouseMove:function(e){var n=v(e,c,w,T),t=Object(r.a)(n,2);c=t[0],t[1]&&c.redraw(s.current)},onMouseUp:function(e){T=!1},onTouchEnd:function(e){},className:"canvas",ref:i,width:t,height:n}),Object(p.jsxs)("div",{id:"control-panel",children:[Object(p.jsxs)("div",{id:"changeButtons",children:[Object(p.jsx)("button",{id:"removeMe",onClick:function(){var e=f(w,c),n=Object(r.a)(e,3);c=n[0],w=n[1],n[2]&&c.redraw(s.current)},children:"Remove Node"}),Object(p.jsx)("button",{id:"autograph",children:"AutoGraph"})]}),Object(p.jsxs)("div",{id:"algorithms-topic",children:[Object(p.jsx)("h1",{children:"Select an algorithm for find the TopologicalSorting: "}),Object(p.jsxs)("select",{children:[Object(p.jsx)("option",{children:"Kahn Algorithm"}),Object(p.jsx)("option",{children:"Classic DFS"})]})]})]})]})},S=(t(25),t(8)),N=t(2);var C=function(){var e=window.innerWidth;return Object(p.jsxs)(S.a,{children:[Object(p.jsx)("main",{children:Object(p.jsxs)(N.c,{children:[Object(p.jsx)(N.a,{exact:!0,path:"/graph-solutions/",children:Object(p.jsx)(M,{width:e,height:400})}),Object(p.jsx)(N.a,{exact:!0,path:"/graph-solutions/topo",children:Object(p.jsx)(k,{width:e,height:400})}),Object(p.jsx)(N.a,{exact:!0,path:"/graph-solutions/",children:Object(p.jsx)(M,{width:e,height:400})}),Object(p.jsx)(N.a,{exact:!0,path:"/graph-solutions/topo",children:Object(p.jsx)(k,{width:e,height:400})})]})}),Object(p.jsxs)("div",{id:"switcher",children:[Object(p.jsx)("div",{children:Object(p.jsx)(S.b,{to:"/graph-solutions/",children:"MST"})}),Object(p.jsx)("div",{children:Object(p.jsx)(S.b,{to:"/graph-solutions/topo",children:"TopologicalSorting"})}),Object(p.jsx)("div",{children:Object(p.jsx)(S.b,{to:"/graph-solutions/",children:"Strongly Connected Components"})}),Object(p.jsx)("div",{children:Object(p.jsx)(S.b,{to:"/graph-solutions/topo",children:"MaxFlow"})})]})]})};c.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.e879dbd5.chunk.js.map