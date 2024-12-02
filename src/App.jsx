import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import EditModal from './components/EditModal';
import { Dumbbell, Undo, Edit } from 'lucide-react';
import { Users, Activity, Briefcase, LightbulbIcon, Heart, Send, UserPlus, DollarSign, TrendingUp } from 'lucide-react'

const sections = [
  { id: 'key-partners', title: 'Key Partners', icon: Users },
  { id: 'key-activities', title: 'Key Activities', icon: Activity },
  { id: 'key-resources', title: 'Key Resources', icon: Briefcase },
  { id: 'value-propositions', title: 'Value Propositions', icon: LightbulbIcon },
  { id: 'customer-relationships', title: 'Customer Relationships', icon: Heart },
  { id: 'channels', title: 'Channels', icon: Send },
  { id: 'customer-segments', title: 'Customer Segments', icon: UserPlus },
  { id: 'cost-structure', title: 'Cost Structure', icon: DollarSign },
  { id: 'revenue-streams', title: 'Revenue Streams', icon: TrendingUp },
];

function App() {
  const [canvasData, setCanvasData] = useState(() => {
    const savedData = localStorage.getItem('canvasData');
    return savedData
      ? JSON.parse(savedData)
      : sections.reduce((acc, section) => {
        acc[section.id] = [];
        return acc;
      }, {});
  });

  // New state to track undo history and undo button visibility
  const [history, setHistory] = useState([]);
  const [showUndo, setShowUndo] = useState(false);
  const [undoAnimation, setUndoAnimation] = useState('');

  // Function to save the current state to history
  const saveToHistory = (currentData) => {
    const newHistory = [currentData, ...history].slice(0, 10);
    setHistory(newHistory);
    
    // Show undo button with animation
    setShowUndo(true);
    setUndoAnimation('animate-bounce');
    
    // Hide undo button after 5 seconds with fade-out animation
    const timer = setTimeout(() => {
      setUndoAnimation('animate-fade-out');
      setTimeout(() => {
        setShowUndo(false);
        setUndoAnimation('');
      }, 500); // Match this with the fade-out animation duration
    }, 5000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    localStorage.setItem('canvasData', JSON.stringify(canvasData));
  }, [canvasData]);

  const addItem = (sectionId, newValue) => {
    if (newValue.trim().length > 0) {
      saveToHistory(canvasData);
      setCanvasData((prevData) => ({
        ...prevData,
        [sectionId]: [...prevData[sectionId], newValue],
      }));
    }
    setAddingItem(null);
  };

  const deleteItem = (sectionId, index) => {
    saveToHistory(canvasData);
    setCanvasData((prevData) => {
      const newItems = [...prevData[sectionId]];
      newItems.splice(index, 1);
      return { ...prevData, [sectionId]: newItems };
    });
  };

  const editItem = (sectionId, index) => {
    setEditingItem({ sectionId, index, value: canvasData[sectionId][index] });
  };

  const saveItem = (newValue) => {
    const { sectionId, index } = editingItem;
    if (newValue.trim().length > 0) {
      saveToHistory(canvasData);
      setCanvasData((prevData) => {
        const newItems = [...prevData[sectionId]];
        newItems[index] = newValue;
        return { ...prevData, [sectionId]: newItems };
      });
    }
    setEditingItem(null);
  };

  // New undo function
  const undoLastAction = () => {
    if (history.length > 0) {
      const [previousState, ...remainingHistory] = history;
      setCanvasData(previousState);
      setHistory(remainingHistory);
      
      // Hide undo button after undoing
      setUndoAnimation('animate-fade-out');
      setTimeout(() => {
        setShowUndo(false);
        setUndoAnimation('');
      }, 500);
    }
  };

  const exportCanvas = () => {
    const json = JSON.stringify(canvasData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-model-canvas.json';
    a.click();
  };

  const importCanvas = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const importedData = JSON.parse(reader.result);
        saveToHistory(canvasData);
        setCanvasData(importedData);
      };
      reader.readAsText(file);
    }
  };

  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(null);

  return (
    <div className="min-h-screen bg-base-200 p-8 font-[poppins]">
      <div className="text-center mb-6">
        <h1 className="text-6xl font-semibold">
          <Dumbbell className="w-14 h-14 inline-block mr-2" />
          Fit Gear
        </h1>
        <p className="text-lg text-base-content">Business Model Canvas</p>
      </div>
      <div className="flex justify-center gap-4 mb-6">
        <button className="btn btn-primary" onClick={exportCanvas}>
          Export Canvas
        </button>
        <label className="btn btn-secondary">
          Import Canvas
          <input type="file" className="hidden" onChange={importCanvas} />
        </label>
        {showUndo && (
          <button 
            className={`btn btn-accent fixed top-6 right-6 ${undoAnimation}`}
            onClick={undoLastAction}
            style={{
              animationDuration: '0.5s',
              transitionDuration: '0.5s'
            }}
          >
            <Undo className="w-4 h-4 mr-2" /> Undo
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            Icon={section.icon}
            items={canvasData[section.id]}
            onAdd={() => setAddingItem(section.id)}
            onDelete={(index) => deleteItem(section.id, index)}
            onEdit={(index) => editItem(section.id, index)}
          />
        ))}
      </div>
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={saveItem}
        />
      )}
      {addingItem && (
        <EditModal
          item={{ value: '' }}
          onClose={() => setAddingItem(null)}
          onSave={(newValue) => addItem(addingItem, newValue)}
        />
      )}
    </div>
  );
}

export default App;