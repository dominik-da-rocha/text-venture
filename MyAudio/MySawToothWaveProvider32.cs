using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyAudio
{
  public class MySawToothWaveProvider32 : MyWaveProvider32
  {
    private int sample = 0;

    public override int Read(float[] buffer, int offset, int sampleCount)
    {
      int sampleRate = WaveFormat.SampleRate;
      for (int n = 0; n < sampleCount; n++)
      {
        float value = (float) - 2 * Frequency * Amplitude * sample / (sampleRate) + Amplitude;
        buffer[n + offset] = value;
        sample++;
        if (value <= -Amplitude)
          sample = 0;
        else
          sample++;
      }
      return sampleCount;
    }
  }
}
