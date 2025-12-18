function logModelInfo(model) {
    console.log('=== Model Information ===');
    console.log('Total children:', model.children.length);
    
    let meshCount = 0;
    let totalVertices = 0;
    let totalFaces = 0;
    
    model.traverse((child) => {
        if (child.isMesh) {
            meshCount++;
            if (child.geometry) {
                const vertices = child.geometry.attributes.position;
                const faces = child.geometry.index ? child.geometry.index.count / 3 : 0;
                
                totalVertices += vertices ? vertices.count : 0;
                totalFaces += faces;
                
                console.log(`Mesh ${meshCount}: ${vertices ? vertices.count : 'N/A'} vertices, ${faces} faces`);
                console.log(`  Material:`, child.material);
            }
        }
    });
    
    console.log(`\nSummary:`);
    console.log(`Meshes: ${meshCount}`);
    console.log(`Total vertices: ${totalVertices}`);
    console.log(`Total faces: ${totalFaces}`);
}

// Call after loading:
loader.load('your-model.gltf', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    logModelInfo(model);
});