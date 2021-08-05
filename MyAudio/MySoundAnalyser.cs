using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Timers;

namespace MyAudio
{
  public class MySoundAnalyser
  {

    private WaveIn mWaveSource = new WaveIn();

    public int SampleRate {
      get { return mWaveSource.WaveFormat.SampleRate; }
    }

    public event EventHandler<WaveInEventArgs> DataAvailable;

    public void Start()
    {
      mWaveSource.StartRecording();
      mWaveSource.DataAvailable += WaveSource_DataAvailable;
      
    }

    private void WaveSource_DataAvailable(object sender, WaveInEventArgs e)
    {
      if (DataAvailable != null)
      {
        DataAvailable(sender, e);
      }
    }

    public void Stop()
    {
      mWaveSource.StopRecording();
    }


  }
}
