import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { assets } from "../../assets/assets";
import { Settings, X } from "lucide-react";

// Fallback Image Component
function FallbackImage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-orange-500/5 rounded-full filter blur-3xl transform -rotate-12 pointer-events-none"></div>
      <img
        src={assets.car}
        alt="Luxury Car"
        className="relative z-10 w-full h-auto max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full absolute inset-0 z-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-orange-200 dark:border-orange-900/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

// Advanced Control Panel Component
function AdvancedControlPanel({ 
  position, setPosition, 
  scale, setScale, 
  cameraPos, setCameraPos,
  lighting, setLighting,
  rotation, setRotation,
  isOpen, setIsOpen,
  autoRotate, setAutoRotate 
}) {
  const adjustValue = (category, axis, delta) => {
    if (category === 'position') {
      setPosition(prev => ({ ...prev, [axis]: prev[axis] + delta }));
    } else if (category === 'scale') {
      setScale(prev => ({ ...prev, [axis]: prev[axis] + delta }));
    } else if (category === 'camera') {
      setCameraPos(prev => ({ ...prev, [axis]: prev[axis] + delta }));
    } else if (category === 'lighting') {
      setLighting(prev => ({ ...prev, [axis]: Math.max(0, Math.min(3, prev[axis] + delta)) }));
    } else if (category === 'rotation') {
      setRotation(prev => ({ ...prev, [axis]: prev[axis] + delta }));
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all"
        title="Open 3D Controls">
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-700 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-zinc-900 p-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h3 className="font-bold text-sm text-zinc-900 dark:text-white">3D Controls</h3>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
          <X className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>
      
      <div className="p-3 space-y-3 text-xs">
        {/* Position */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Position</p>
          {['x', 'y', 'z'].map(axis => (
            <div key={axis} className="flex items-center gap-1 mb-1">
              <span className="w-3 uppercase text-zinc-600 dark:text-zinc-400">{axis}</span>
              <button onClick={() => adjustValue('position', axis, -0.5)} className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{position[axis].toFixed(1)}</span>
              <button onClick={() => adjustValue('position', axis, 0.5)} className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Scale */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Scale</p>
          {['x', 'y', 'z'].map(axis => (
            <div key={axis} className="flex items-center gap-1 mb-1">
              <span className="w-3 uppercase text-zinc-600 dark:text-zinc-400">{axis}</span>
              <button onClick={() => adjustValue('scale', axis, -5)} className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{scale[axis].toFixed(0)}</span>
              <button onClick={() => adjustValue('scale', axis, 5)} className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Camera Position */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Camera</p>
          {['x', 'y', 'z'].map(axis => (
            <div key={axis} className="flex items-center gap-1 mb-1">
              <span className="w-3 uppercase text-zinc-600 dark:text-zinc-400">{axis}</span>
              <button onClick={() => adjustValue('camera', axis, -0.5)} className="px-1.5 py-0.5 bg-green-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{cameraPos[axis].toFixed(1)}</span>
              <button onClick={() => adjustValue('camera', axis, 0.5)} className="px-1.5 py-0.5 bg-green-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Lighting */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Lighting</p>
          {[
            { key: 'ambient', label: 'Ambient' },
            { key: 'main', label: 'Main' },
            { key: 'fill', label: 'Fill' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-1 mb-1">
              <span className="w-12 text-[10px] text-zinc-600 dark:text-zinc-400">{label}</span>
              <button onClick={() => adjustValue('lighting', key, -0.1)} className="px-1.5 py-0.5 bg-yellow-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{lighting[key].toFixed(1)}</span>
              <button onClick={() => adjustValue('lighting', key, 0.1)} className="px-1.5 py-0.5 bg-yellow-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Rotation Limits */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Rotation</p>
          {[
            { key: 'limit', label: 'Limit (°)' },
            { key: 'minPolar', label: 'Min V' },
            { key: 'maxPolar', label: 'Max V' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-1 mb-1">
              <span className="w-12 text-[10px] text-zinc-600 dark:text-zinc-400">{label}</span>
              <button onClick={() => adjustValue('rotation', key, -5)} className="px-1.5 py-0.5 bg-purple-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{rotation[key].toFixed(0)}</span>
              <button onClick={() => adjustValue('rotation', key, 5)} className="px-1.5 py-0.5 bg-purple-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Material Properties */}
        <div>
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Material</p>
          {[
            { key: 'metalness', label: 'Metal' },
            { key: 'roughness', label: 'Rough' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-1 mb-1">
              <span className="w-12 text-[10px] text-zinc-600 dark:text-zinc-400">{label}</span>
              <button onClick={() => setLighting(prev => ({ ...prev, [key]: Math.max(0, Math.min(1, prev[key] - 0.1)) }))} className="px-1.5 py-0.5 bg-pink-500 text-white rounded text-[10px]">-</button>
              <span className="w-10 text-center text-zinc-900 dark:text-white">{lighting[key]?.toFixed(1) || '0.0'}</span>
              <button onClick={() => setLighting(prev => ({ ...prev, [key]: Math.max(0, Math.min(1, (prev[key] || 0) + 0.1)) }))} className="px-1.5 py-0.5 bg-pink-500 text-white rounded text-[10px]">+</button>
            </div>
          ))}
        </div>

        {/* Auto-Rotation Toggle */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-full px-3 py-2 rounded text-xs font-semibold transition-colors ${
              autoRotate 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
            }`}>
            {autoRotate ? '⏸ Pause Rotation' : '▶ Auto Rotate'}
          </button>
        </div>

        {/* Export Values */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
          <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Current Values</p>
          <pre className="text-[9px] bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-zinc-900 dark:text-white overflow-x-auto max-w-[200px]">
{`Pos: ${position.x},${position.y},${position.z}
Scale: ${scale.x},${scale.y},${scale.z}
Cam: ${cameraPos.x},${cameraPos.y},${cameraPos.z}
Light: A${lighting.ambient} M${lighting.main} F${lighting.fill}
Rot: ${rotation.limit}° V${rotation.minPolar}-${rotation.maxPolar}
Mat: M${lighting.metalness?.toFixed(1)} R${lighting.roughness?.toFixed(1)}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Main 3D Car Component
function Car3DModel() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const carModelRef = useRef(null);
  const animationIdRef = useRef(null);
  const lightsRef = useRef({});

  // Control states - SYNCHRONIZED with actual model - USER'S PERFECT SETTINGS (Adjusted for Center)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 }); // Centered X
  const [scale, setScale] = useState({ x: 230, y: 265, z: 190 });
  const [cameraPos, setCameraPos] = useState({ x: 4.5, y: 4.5, z: 9.5 }); // Adjusted for better perspective
  const [lighting, setLighting] = useState({ 
    ambient: 2.1,      // Hemisphere light intensity
    main: 2.8,         // Main directional light
    fill: 2.2,         // Fill light
    metalness: 0.5,    // Material metalness
    roughness: 0.5     // Material roughness
  });
  const [rotation, setRotation] = useState({ 
    limit: 180,        // Horizontal rotation limit in degrees
    minPolar: 30,      // Min vertical angle in degrees
    maxPolar: 65       // Max vertical angle in degrees
  });
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true); // Auto-rotation enabled by default
  const autoRotateRef = useRef({ angle: 0, direction: 1, speed: 0.0003 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - USE STATE VALUES
    const camera = new THREE.PerspectiveCamera(
      65,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    cameraRef.current = camera;

    // Renderer setup with shadows - WRAPPED IN TRY/CATCH TO PREVENT CRASH
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.error("WebGL is not supported or disabled:", e);
      setHasError(true);
      setIsLoading(false);
      return; // Exit useEffect to prevent further errors
    }

    // Lights - USE STATE VALUES
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, lighting.ambient);
    scene.add(hemisphereLight);
    lightsRef.current.hemisphere = hemisphereLight;

    const mainLight = new THREE.DirectionalLight(0xffffff, lighting.main);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    lightsRef.current.main = mainLight;

    const fillLight = new THREE.DirectionalLight(0xffffff, lighting.fill);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);
    lightsRef.current.fill = fillLight;

    const rimLight = new THREE.DirectionalLight(0xff9966, 1.2);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff8844, 0.6, 15);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 2.0);
    spotLight.position.set(0, 20, 0);
    spotLight.angle = 0.4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);

    // OrbitControls - USE STATE VALUES
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    
    const rotationLimit = (rotation.limit * Math.PI) / 180;
    const centerAngle = Math.PI / 2;
    controls.minAzimuthAngle = centerAngle - (rotationLimit / 2);
    controls.maxAzimuthAngle = centerAngle + (rotationLimit / 2);
    controls.minPolarAngle = (rotation.minPolar * Math.PI) / 180;
    controls.maxPolarAngle = (rotation.maxPolar * Math.PI) / 180;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Bidirectional sync: Update state when user manually moves camera
    let updateScheduled = false;
    const handleControlsChange = () => {
      if (!updateScheduled) {
        updateScheduled = true;
        requestAnimationFrame(() => {
          if (cameraRef.current) {
            setCameraPos({
              x: parseFloat(cameraRef.current.position.x.toFixed(1)),
              y: parseFloat(cameraRef.current.position.y.toFixed(1)),
              z: parseFloat(cameraRef.current.position.z.toFixed(1))
            });
          }
          updateScheduled = false;
        });
      }
    };
    controls.addEventListener('change', handleControlsChange);

    // Load 3D model - USE STATE VALUES
    const loader = new GLTFLoader();
    loader.load(
      assets.car3d,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(scale.x, scale.y, scale.z);
        model.position.set(position.x, position.y, position.z);
        
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.metalness = lighting.metalness;
              child.material.roughness = lighting.roughness;
              child.material.envMapIntensity = 1.5;
              child.material.needsUpdate = true;
            }
          }
        });
        
        scene.add(model);
        carModelRef.current = model;
        setIsLoading(false);
      },
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
      },
      (error) => {
        console.error("Error loading 3D model:", error);
        setHasError(true);
        setIsLoading(false);
      }
    );

    // Animation loop with auto-rotation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Auto-rotation logic
      if (autoRotate && controlsRef.current) {
        const rotState = autoRotateRef.current;
        
        // Update angle
        rotState.angle += rotState.speed * rotState.direction;
        
        // Calculate rotation limit in radians (180 degrees = π radians)
        const maxRotation = Math.PI; // 180 degrees
        
        // Reverse direction when reaching limits
        if (rotState.angle >= maxRotation) {
          rotState.angle = maxRotation;
          rotState.direction = -1;
        } else if (rotState.angle <= 0) {
          rotState.angle = 0;
          rotState.direction = 1;
        }
        
        // Apply rotation to controls
        const centerAngle = Math.PI / 2;
        const rotationLimit = (rotation.limit * Math.PI) / 180;
        const minAngle = centerAngle - (rotationLimit / 2);
        
        // Map 0-π to the allowed rotation range
        const mappedAngle = minAngle + (rotState.angle / maxRotation) * rotationLimit;
        
        // Set the azimuth angle directly
        const currentAzimuth = controlsRef.current.getAzimuthalAngle();
        const targetAzimuth = mappedAngle;
        
        // Smoothly interpolate to target angle
        const newAzimuth = currentAzimuth + (targetAzimuth - currentAzimuth) * 0.1;
        
        // Update controls by setting position
        const distance = Math.sqrt(
          Math.pow(camera.position.x, 2) + 
          Math.pow(camera.position.z, 2)
        );
        
        camera.position.x = distance * Math.sin(newAzimuth);
        camera.position.z = distance * Math.cos(newAzimuth);
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (controlsRef.current) {
        controlsRef.current.removeEventListener('change', handleControlsChange);
      }
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) rendererRef.current.dispose();
      if (controlsRef.current) controlsRef.current.dispose();
    };
  }, []); // Only run once on mount

  // Update model position
  useEffect(() => {
    if (carModelRef.current) {
      carModelRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  // Update model scale
  useEffect(() => {
    if (carModelRef.current) {
      carModelRef.current.scale.set(scale.x, scale.y, scale.z);
    }
  }, [scale]);

  // Update camera position (only when changed via controls, not during drag)
  useEffect(() => {
    if (cameraRef.current) {
      const currentX = parseFloat(cameraRef.current.position.x.toFixed(1));
      const currentY = parseFloat(cameraRef.current.position.y.toFixed(1));
      const currentZ = parseFloat(cameraRef.current.position.z.toFixed(1));
      
      // Only update if values are different (prevents loop)
      if (currentX !== cameraPos.x || currentY !== cameraPos.y || currentZ !== cameraPos.z) {
        cameraRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
      }
    }
  }, [cameraPos]);

  // Update lighting
  useEffect(() => {
    if (lightsRef.current.hemisphere) lightsRef.current.hemisphere.intensity = lighting.ambient;
    if (lightsRef.current.main) lightsRef.current.main.intensity = lighting.main;
    if (lightsRef.current.fill) lightsRef.current.fill.intensity = lighting.fill;
    
    if (carModelRef.current) {
      carModelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.metalness = lighting.metalness || 0.7;
          child.material.roughness = lighting.roughness || 0.3;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [lighting]);

  // Update rotation limits
  useEffect(() => {
    if (controlsRef.current) {
      const rotationLimit = (rotation.limit * Math.PI) / 180;
      const centerAngle = Math.PI / 2;
      controlsRef.current.minAzimuthAngle = centerAngle - (rotationLimit / 2);
      controlsRef.current.maxAzimuthAngle = centerAngle + (rotationLimit / 2);
      controlsRef.current.minPolarAngle = (rotation.minPolar * Math.PI) / 180;
      controlsRef.current.maxPolarAngle = (rotation.maxPolar * Math.PI) / 180;
    }
  }, [rotation]);

  if (hasError) return <FallbackImage />;

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-orange-500/5 rounded-full filter blur-3xl transform -rotate-12 pointer-events-none"></div>
      
      <AdvancedControlPanel
        position={position}
        setPosition={setPosition}
        scale={scale}
        setScale={setScale}
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        lighting={lighting}
        setLighting={setLighting}
        rotation={rotation}
        setRotation={setRotation}
        isOpen={isControlOpen}
        setIsOpen={setIsControlOpen}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
      />

      <div ref={containerRef} className="relative z-10 w-full h-full" style={{ cursor: "grab" }} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default Car3DModel;