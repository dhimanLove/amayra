import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className = '' }: DotGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const rafIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current || !meshRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const camera = cameraRef.current;
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    // Rebuild instance matrices for new viewport
    const spacing = 28;
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;
    const count = cols * rows;

    meshRef.current.count = count;

    const matrix = new THREE.Matrix4();
    const offset = new THREE.Vector3();
    let index = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        offset.set(
          j * spacing - (cols * spacing) / 2,
          i * spacing - (rows * spacing) / 2,
          0
        );
        matrix.setPosition(offset);
        meshRef.current.setMatrixAt(index, matrix);
        index++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      cancelAnimationFrame(rafIdRef.current);
    } else {
      animate();
    }
  }, []);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !meshRef.current) return;

    timeRef.current += 0.016;

    // Breathing scale animation (period ~4s)
    const breathScale = 1 + Math.sin(timeRef.current * (Math.PI / 2)) * 0.08;

    // Mouse parallax offset
    const parallaxX = mouseRef.current.x * 8;
    const parallaxY = mouseRef.current.y * 8;

    meshRef.current.position.set(parallaxX, parallaxY, 0);
    meshRef.current.scale.setScalar(breathScale);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    rafIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera (orthographic for 2D effect)
      const camera = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        0.1,
        100
      );
      camera.position.z = 1;
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0xffffff, 0);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Instanced mesh for dots
      const spacing = 28;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const count = cols * rows;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({
        color: 0xdbdbdb,
        transparent: true,
        opacity: 0.18,
      });

      const mesh = new THREE.InstancedMesh(geometry, material, count);
      meshRef.current = mesh;

      const matrix = new THREE.Matrix4();
      const offset = new THREE.Vector3();
      let index = 0;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          offset.set(
            j * spacing - (cols * spacing) / 2,
            i * spacing - (rows * spacing) / 2,
            0
          );
          matrix.setPosition(offset);
          mesh.setMatrixAt(index, matrix);
          index++;
        }
      }

      scene.add(mesh);

      // Start animation
      animate();
    };

    init();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      cancelAnimationFrame(rafIdRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (containerRef.current && rendererRef.current.domElement.parentNode) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [animate, handleResize, handleMouseMove, handleVisibilityChange]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
}
