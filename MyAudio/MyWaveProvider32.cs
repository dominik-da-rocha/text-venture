using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAudio
{
  public abstract class MyWaveProvider32 : IWaveProvider
  {

    private WaveFormat mWaveFormat;
    public float Frequency { get; set; }
    public float Amplitude { get; set; }

    public MyWaveProvider32()
    {
      mWaveFormat = new WaveFormat(44100, 1);
    }


    public WaveFormat WaveFormat
    {
      get
      {
        return mWaveFormat;
      }
    }

    public void SetWaveFormat(int sampleRate, int channels)
    {
      mWaveFormat = WaveFormat.CreateIeeeFloatWaveFormat(sampleRate, channels);
    }

    public int Read(byte[] buffer, int offset, int count)
    {
      WaveBuffer waveBuffer = new WaveBuffer(buffer);
      int samplesRequired = count / 4;
      int samplesRead = Read(waveBuffer.FloatBuffer, offset / 4, samplesRequired);
      return samplesRead * 4;
    }

    public abstract int Read(float[] buffer, int offset, int sampleCount);



  }
}
