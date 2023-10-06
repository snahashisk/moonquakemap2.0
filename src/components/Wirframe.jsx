import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import wireframeGLB from "../assets/models/wireframe.glb";

const Wireframe = () => {
  const [wireframeModel] = useLoader(GLTFLoader, [wireframeGLB]);
  return <primitive object={wireframeModel.scene} scale={0.0181} />;
};

export default Wireframe;
