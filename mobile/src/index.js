import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
    
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project} key={project.id}>{project.title}</Text>
          )}
        />

        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleAddProject}>
          <Text style={styles.textButton}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },
  project: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#fff'
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})