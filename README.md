  # Moodify - Your Personal Mood DJ 🎵 - using Mira AI Flows
Submission by Chaitanya Jha | IIT Patna | chaitanyajha.quantum@gmail.com
--
Demo Video Link: https://youtu.be/sr8SNk0gbOQ
--
 <img width="1470" alt="Screenshot 2024-12-27 at 4 26 58 AM" src="https://github.com/user-attachments/assets/0ebc629b-306f-48b3-b8a1-59fef7ca1b91" />
 
  ## About
  Moodify transforms your emotional state and daily context into perfectly curated music experiences. This advanced AI-powered system uses OpenAI gpt-4o to analyze multiple parameters including your mood, current activity, recent life events, energy level, genre preferences, time of day, weather conditions, wellness goals, and preferred music pace to generate highly personalized playlists.

  ## How It Works
  The system creates comprehensive music recommendations by applying a sophisticated weighted algorithm (Involving min-max scaling and variance controlled normalization, including composite scoring) that prioritizes the most impactful factors in your current context. Each generated playlist contains 20-30 unique songs, carefully selected and arranged to ensure smooth transitions and consistent audio quality.

  For each playlist, Moodify provides detailed explanations of why each song was chosen, how it aligns with your input parameters, and its role in the overall listening experience. The system also generates individual parameter-specific playlists to help you understand how each factor influences the music selection.

  ## Features
  - Mood-based music curation
  - Activity-specific playlists
  - Weather-adaptive recommendations
  - Wellness-focused song selection
  - Energy level matching
  - Time-of-day optimization
  - Genre preferences consideration
  - Detailed song selection explanations
  - Smart transition management
  - Psychological impact analysis

<img width="1470" alt="Screenshot 2024-12-27 at 4 37 09 AM" src="https://github.com/user-attachments/assets/8c6e6a28-2774-4bed-94fc-e83475c44027" />
<img width="1470" alt="Screenshot 2024-12-27 at 4 37 13 AM" src="https://github.com/user-attachments/assets/63d41282-c806-4bfd-bb03-28e05ca6e2f2" />

  ## Example Input
  ```json
  {
      "mood": "Heartbroken 💔",
      "activity": "Listening to sad music 🎶",
      "event": "After months of building dreams together, we decided to part ways, leaving me to navigate the stormy seas of loss and longing.",
      "energy_level": 30,
      "genre": "Blues 🎸",
      "time_of_day": "Night 🌙",
      "weather": "Rainy 🌧️",
      "wellness_needs": ["Emotional support", "Reflection"],
      "music_pace": 60
  }
  ```

  ## Use Cases
  - Study Enhancement
  - Workout Optimization
  - Emotional Support
  - Mindfulness Practice
  - Productivity Boost
  - Mood Management
  - Stress Relief
  - Personal Reflection

  ## Technical Details
  - Model: OpenAI gpt-4o
  - Playlist Length: 20-30 songs
  - Parameter Weighting: Sophisticated algorithm
  - Output Format: JSON with detailed explanations
  - Audio Quality: Consistent high-quality standards (Possibility of connecting with Spotify using Composio.

  ## Why Moodify?
  Whether you're looking to enhance your study session, optimize your workout, support your emotional well-being, or simply find the perfect soundtrack for your moment, Moodify adapts to your needs. The system's intelligent curation considers not just individual song selections, but also the overall flow, energy progression, and psychological impact of the entire playlist.

  ## Get Started
  Use Moodify to discover music that resonates with your current state, supports your goals, and enhances your daily experiences through the power of contextually aware music recommendations.

  ---

  Made with ❤️ by wafflebytes
